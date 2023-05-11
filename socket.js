module.exports = function initializeSocket(io) {
  const { getRandomTrack, getRandomArtists } = require('./api/spotify');

  function generateRandomRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let result = '';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  

  const rooms = {};

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

  io.on('connection', (socket) => {
    socket.on('join', ({ username, room }) => {
      const gameState = getRoomState(room);
      socket.join(room);

      gameState.players[socket.id] = { username, score: 0, hasAnswered: false };
      io.to(room).emit('updateScoreboard', gameState.players);
  
      if (Object.keys(gameState.players).length === 10) {
        startGame();
      } else if (Object.keys(gameState.players).length >= 3) {
        if (gameState.countdown === 10) {
          const countdownInterval = setInterval(() => {
            gameState.countdown -= 1;
            io.to(room).emit('updateCountdown', gameState.countdown);
        
            if (gameState.countdown === 0) {
              clearInterval(countdownInterval);
              startGame(room);
            }
          }, 1000);
        }
        
      }
    });

socket.on('createRoom', () => {
  const room = generateRandomRoomId();
  getRoomState(room);
  socket.emit('roomCreated', room);
});


    socket.on('submitAnswer', ({ answer, room }) => {
      const gameState = getRoomState(room);
      if (!gameState.players[socket.id].hasAnswered && gameState.currentQuestion) {
        gameState.players[socket.id].hasAnswered = true;
        gameState.playersAnswered++;
    
        let correctAnswerGiven = false;
    
        if (answer === gameState.currentQuestion.correctAnswer) {
          correctAnswerGiven = true;
          gameState.players[socket.id].score += 1;
          io.to(room).emit('updateScoreboard', gameState.players);
    
          if (gameState.players[socket.id].score === 10) { 
            io.to(room).emit('redirectToResults', gameState.players[socket.id].username);
          } else {
            nextQuestion(room);
          }
        }
    
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
    
    

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
      const room = Object.keys(socket.rooms).find((r) => r !== socket.id);
      console.log('Room:', room);
      if (room) {
        const gameState = getRoomState(room);
        delete gameState.players[socket.id];
        io.to(room).emit('updateScoreboard', gameState.players);
      }
    });    
  });


  async function populateTracks(gameState) {
    const playlistId = "37i9dQZEVXbNG2KDcFcKOF";
    for (let i = 0; i < 15; i++) {
      const track = await getRandomTrack(playlistId);
      gameState.tracks.push(track);
    }
  }
  
  

  async function startGame(room) {
    const gameState = getRoomState(room);
    gameState.countdown = -1;
    io.to(room).emit('updateCountdown', gameState.countdown);
    await populateTracks(gameState);
    gameState.host = selectHost(gameState);
    nextQuestion(room);
  }
  
  
  
  

  function selectHost(gameState) {
    const playerIds = Object.keys(gameState.players);
    return playerIds[Math.floor(Math.random() * playerIds.length)];
  }
  

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
  
    for (const playerId in gameState.players) {
      gameState.players[playerId].hasAnswered = false;
      io.to(room).to(playerId).emit('enableButtons');
    }
  }    
};