const socket = io();

const countdownElement = document.getElementById('countdown');
const previewElement = document.getElementById('preview');
const optionsElement = document.getElementById('options');
const scoreboardElement = document.getElementById('scoreboard');

let isHost = false;

socket.on('updateCountdown', (countdown) => {
  if (countdown < 0) {
    countdownElement.style.display = 'none';
  } else if (countdown === 10) {
    countdownElement.innerText = "Het spel wordt automatisch gestart als er 3 spelers in deze room zitten";
  } else {
    countdownElement.style.display = 'block';
    countdownElement.innerText = `We beginnen in .. ${countdown}`;
  }
});

socket.on('enableButtons', () => {
  const buttons = optionsElement.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
});

socket.on('disableButtons', () => {
  const buttons = optionsElement.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
});

socket.on('newQuestion', (question) => {
  isHost = socket.id === question.hostId;
  previewElement.src = question.previewUrl;
  optionsElement.innerHTML = '';
  question.options.forEach((artist, index) => {
    const option = document.createElement('button');
    option.innerText = artist;
    option.addEventListener('click', () => {
      socket.emit('submitAnswer', { answer: artist, room: roomName });
    });
    optionsElement.appendChild(option);
  });
});

previewElement.addEventListener('canplaythrough', () => {
  previewElement.play();
});

socket.on('updateScoreboard', (players) => {
  scoreboardElement.innerHTML = '';
  for (const playerId in players) {
    const player = players[playerId];
    const scoreEntry = document.createElement('div');
    scoreEntry.innerText = `${player.username}: ${player.score}`;
    scoreboardElement.appendChild(scoreEntry);
  }
});

previewElement.addEventListener('ended', () => {
  if (isHost) {
    socket.emit('nextRound', roomName);
  }
});

socket.on('redirectToResults', (winner) => {
  window.location.href = `/quiz_result?winner=${encodeURIComponent(winner)}`;
});

const username = new URLSearchParams(window.location.search).get('username');
const roomName = new URLSearchParams(window.location.search).get('room');
if (username && roomName) {
  socket.emit('join', { username, room: roomName });
}
