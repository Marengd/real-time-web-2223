module.exports = function initializeSocket(io) {

  const { getRandomTrack, getRandomArtists } = require('./api/spotify');

  // Functie om willekeurige RoomID te genereren.
  function generateRandomRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  // Object dat alle rooms bijhoudt.
  const rooms = {};

  // Functie om de status van een bepaalde room op te vragen of te initialiseren mocht deze nog niet bestaan.
  function getRoomState(room) {
    if (!rooms[room]) {
      rooms[room] = {
        players: {},
        countdown: 10,
        currentQuestion: null,
        playersAnswered: 0,
        tracks: [],
        host: null,
        tracksLoaded: false,
        roundNumber: 0,
      };
    }
    return rooms[room];
  }

  // Start luisteren naar verbindingen.
  io.on('connection', (socket) => {

    // Als een speler een room wil joinen.
    socket.on('join', ({ username, room }) => {
      const gameState = getRoomState(room);
      socket.join(room);

      // Voeg de speler toe aan de room.
      gameState.players[socket.id] = { username, score: 0, hasAnswered: false };

      // Updaten van het scoreboard.
      io.to(room).emit('updateScoreboard', gameState.players);

      // Controleer aantal spelers in de room en start het spel indien nodig.
      const playerCount = Object.keys(gameState.players).length;
      if (playerCount === 10) {
        startGame(room);
      } else if (playerCount >= 3 && gameState.countdown === 10) {

        // Begin met het aftellen, ongeacht of de tracks al zijn opgehaald.
        const countdownInterval = setInterval(() => {
          gameState.countdown -= 1;
          io.to(room).emit('updateCountdown', gameState.countdown);

          if (gameState.countdown === 0) {
            clearInterval(countdownInterval);
            if (gameState.tracksLoaded) { // controleer of de tracks zijn geladen.
              startGame(room);
            } else {
              console.log("Tracks zijn nog niet geladen.")
            }
          }
        }, 1000);

        // Begin met het ophalen van de tracks terwijl het aftellen aan de gang is.
        if (!gameState.tracksLoaded) {
          populateTracks(gameState);
        }
      }
    });

    // Als een speler een nieuwe room wil maken.
    socket.on('createRoom', () => {
      const room = generateRandomRoomId();
      getRoomState(room);
      socket.emit('roomCreated', room);
    });

    // Als een speler een antwoord instuurt.
    socket.on('submitAnswer', ({ answer, room }) => {
      const gameState = getRoomState(room);
      const player = gameState.players[socket.id];

      // Controleer of de speler nog niet heeft geantwoord en er een actieve vraag is.
      if (!player.hasAnswered && gameState.currentQuestion) {
        player.hasAnswered = true;
        gameState.playersAnswered++;

        // Check of het antwoord correct was.
        let correctAnswerGiven = answer === gameState.currentQuestion.correctAnswer;

        if (correctAnswerGiven) {
          player.score += 1;
          io.to(room).emit('updateScoreboard', gameState.players);

          // Zodra een speler 10 punten heeft behaald.
          if (player.score === 10) {
            io.to(room).emit('redirectToResults', player.username);
          } else {
            nextQuestion(room);
          }
        }

        // Als alle spelers hebben geantwoord, forceren we de volgende vraag.
        if (gameState.playersAnswered === Object.keys(gameState.players).length) {
          if (!correctAnswerGiven) {
            nextQuestion(room);
          } else if (socket.id === gameState.host) {
            nextQuestion(room);
          }
        }

        socket.emit('disableButtons');
      }
    });

    socket.on('nextRound', (room) => {
      const gameState = getRoomState(room);
      if (socket.id === gameState.host) {
        nextQuestion(room);
      }
    });

    // Wanneer een speler de verbinding verbreekt.
    socket.on('disconnect', () => {
      const room = Object.keys(socket.rooms).find((r) => r !== socket.id);
      if (room) {
        const gameState = getRoomState(room);
        delete gameState.players[socket.id];
        io.to(room).emit('updateScoreboard', gameState.players);
      }
    });
  });

  // Functie om tracks uit Spotify API te halen en toe te voegen aan de gameState.
  async function populateTracks(gameState) {
    const playlistId = "37i9dQZEVXbNG2KDcFcKOF";
    for (let i = 0; i < 15; i++) {
      const track = await getRandomTrack(playlistId);
      gameState.tracks.push(track);
    }
    gameState.tracksLoaded = true;
  }

  // Functie om het spel te starten.
  async function startGame(room) {
    const gameState = getRoomState(room);
    gameState.countdown = -1;
    io.to(room).emit('updateCountdown', gameState.countdown);
    gameState.host = selectHost(gameState);
    nextQuestion(room);
  }

  // Functie om een host te selecteren voor de game.
  function selectHost(gameState) {
    const playerIds = Object.keys(gameState.players);
    return playerIds[Math.floor(Math.random() * playerIds.length)];
  }


  // Functie om naar de volgende vraag te gaan.
  async function nextQuestion(room) {
    const gameState = getRoomState(room);
    gameState.playersAnswered = 0;

    gameState.roundNumber++;

    if (gameState.tracks.length === 0) {
      await populateTracks(gameState);
    }

    const track = gameState.tracks.shift();
    const artists = await getRandomArtists(track.artist);
    gameState.currentQuestion = {
      hostId: gameState.host,
      trackId: track.id,
      previewUrl: track.preview_url,
      options: artists.sort(() => Math.random() - 0.5),
      correctAnswer: track.artist,
    };

    // Start de countdown voor iedere ronde.
    let roundCountdown = 5;

    for (const playerId in gameState.players) {
      io.to(room).to(playerId).emit('disableButtons');
    }

    const roundCountdownInterval = setInterval(() => {
      roundCountdown -= 1;
      io.to(room).emit('updateRoundCountdown', { countdown: roundCountdown, roundNumber: gameState.roundNumber });
      if (roundCountdown === 0) {
        clearInterval(roundCountdownInterval);
        io.to(room).emit('newQuestion', gameState.currentQuestion);

        // Reset de hasAnswered status van de spelers en activeer de knoppen.
        for (const playerId in gameState.players) {
          gameState.players[playerId].hasAnswered = false;
          io.to(room).to(playerId).emit('enableButtons');
        }
      }
    }, 1000);
  }
};