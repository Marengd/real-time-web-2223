module.exports = function initializeSocket(io) {
  // Importeer de functies die nodig zijn om de data te verkrijgen van de Spotify API
  const { getRandomTrack, getRandomArtists } = require('./api/spotify');

  // Functie om een willekeurige Room ID te genereren
  function generateRandomRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  // Object dat alle actieve rooms bijhoudt
  const rooms = {};

  // Functie om de status van een bepaalde room op te vragen of te initialiseren als deze nog niet bestaat
  function getRoomState(room) {
    if (!rooms[room]) {
      rooms[room] = {
        players: {},
        countdown: 10,
        currentQuestion: null,
        playersAnswered: 0,
        tracks: [],
        host: null,
      };
    }
    return rooms[room];
  }

  // Start luisteren naar verbindingen
  io.on('connection', (socket) => {
    // Als een speler een room wil joinen
    socket.on('join', ({ username, room }) => {
      const gameState = getRoomState(room);
      socket.join(room);

      // Voeg de speler toe aan de room
      gameState.players[socket.id] = { username, score: 0, hasAnswered: false };
      // Update het scoreboard
      io.to(room).emit('updateScoreboard', gameState.players);

      // Controleer aantal spelers in de room en start het spel indien nodig
      const playerCount = Object.keys(gameState.players).length;
      if (playerCount === 10) {
        startGame(room);
      } else if (playerCount >= 3 && gameState.countdown === 10) {
        // Start een aftelling voor de start van het spel
        const countdownInterval = setInterval(() => {
          gameState.countdown -= 1;
          io.to(room).emit('updateCountdown', gameState.countdown);

          if (gameState.countdown === 0) {
            clearInterval(countdownInterval);
            startGame(room);
          }
        }, 1000);
      }
    });

    // Als een speler een nieuwe room wil maken
    socket.on('createRoom', () => {
      const room = generateRandomRoomId();
      getRoomState(room);
      socket.emit('roomCreated', room);
    });

    // Als een speler een antwoord instuurt
    socket.on('submitAnswer', ({ answer, room }) => {
      const gameState = getRoomState(room);
      const player = gameState.players[socket.id];

      // Controleer of de speler nog niet heeft geantwoord en er een actieve vraag is
      if (!player.hasAnswered && gameState.currentQuestion) {
        player.hasAnswered = true;
        gameState.playersAnswered++;

        // Check of het antwoord correct was
        let correctAnswerGiven = answer === gameState.currentQuestion.correctAnswer;

        if (correctAnswerGiven) {
          player.score += 1;
          io.to(room).emit('updateScoreboard', gameState.players);

          // Als een speler 10 punten heeft behaald
          if (player.score === 10) {
            io.to(room).emit('redirectToResults', player.username);
          } else {
            nextQuestion(room);
          }
        }

        // Als alle spelers hebben geantwoord, ga dan naar de volgende vraag
        if (gameState.playersAnswered === Object.keys(gameState.players).length) {
          if (!correctAnswerGiven) {
            nextQuestion(room);
          } else if (socket.id === gameState.host) {
            nextQuestion(room);
          }
        }

        // Deactiveer de antwoordknoppen voor de huidige vraag
        socket.emit('disableButtons');
      }
    });

    // Als de host besluit om naar de volgende ronde te gaan
    socket.on('nextRound', (room) => {
      const gameState = getRoomState(room);
      if (socket.id === gameState.host) {
        nextQuestion(room);
      }
    });

    // Wanneer een speler de verbinding verbreekt
    socket.on('disconnect', () => {
      // console.log('Disconnected:', socket.id);
      const room = Object.keys(socket.rooms).find((r) => r !== socket.id);
      // console.log('Room:', room);
      if (room) {
        const gameState = getRoomState(room);
        delete gameState.players[socket.id];
        io.to(room).emit('updateScoreboard', gameState.players);
      }
    });
  });

  // Functie om tracks uit Spotify API te halen en toe te voegen aan de gameState
  async function populateTracks(gameState) {
    const playlistId = "37i9dQZEVXbNG2KDcFcKOF";
    for (let i = 0; i < 15; i++) {
      const track = await getRandomTrack(playlistId);
      gameState.tracks.push(track);
    }
  }

  // Functie om het spel te starten
  async function startGame(room) {
    const gameState = getRoomState(room);
    gameState.countdown = -1;
    io.to(room).emit('updateCountdown', gameState.countdown);
    await populateTracks(gameState);
    gameState.host = selectHost(gameState);
    nextQuestion(room);
  }

  // Functie om een host te selecteren voor de game
  function selectHost(gameState) {
    const playerIds = Object.keys(gameState.players);
    return playerIds[Math.floor(Math.random() * playerIds.length)];
  }


  // Functie om naar de volgende vraag te gaan
  async function nextQuestion(room) {
    const gameState = getRoomState(room);
    gameState.playersAnswered = 0;

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
    io.to(room).emit('newQuestion', gameState.currentQuestion);

    // Reset de hasAnswered status van de spelers en activeer de knoppen
    for (const playerId in gameState.players) {
      gameState.players[playerId].hasAnswered = false;
      io.to(room).to(playerId).emit('enableButtons');
    }
  }
};