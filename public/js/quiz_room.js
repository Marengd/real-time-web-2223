const socket = io();

const countdownElement = document.getElementById('countdown');
const previewElement = document.getElementById('preview');
const optionsElement = document.getElementById('options');
const scoreboardElement = document.getElementById('scoreboard');

// Statusvariabele voor host
let isHost = false;

// Luisteraar voor update van aftelling
socket.on('updateCountdown', (countdown) => {
  // Beheer van aftellings-UI
  if (countdown < 0) {
    countdownElement.style.display = 'none';
  } else {
    countdownElement.style.display = 'block';
    countdownElement.innerText = `We beginnen in .. ${countdown}`;
  }
});

// Luisteraar voor het inschakelen van antwoordknoppen
socket.on('enableButtons', () => {
  const buttons = optionsElement.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
});

// Luisteraar voor het uitschakelen van antwoordknoppen
socket.on('disableButtons', () => {
  const buttons = optionsElement.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
});

// Luisteraar voor nieuwe vraag
socket.on('newQuestion', (question) => {
  // Controleer of huidige gebruiker de host is
  isHost = socket.id === question.hostId;
  // Vul vraaggegevens in
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

// Speel voorbeeld af wanneer klaar
previewElement.addEventListener('canplaythrough', () => {
  previewElement.play();
});

// Luisteraar voor update van scorebord
socket.on('updateScoreboard', (players) => {
  // Logica voor het vullen van het scorebord
  scoreboardElement.innerHTML = '';
  for (const playerId in players) {
    const player = players[playerId];
    const scoreEntry = document.createElement('div');
    scoreEntry.innerText = `${player.username}: ${player.score}`;
    scoreboardElement.appendChild(scoreEntry);
  }
});

// Automatische trigger voor volgende ronde voor host
previewElement.addEventListener('ended', () => {
  if (isHost) {
    socket.emit('nextRound', roomName);
  }
});

// Luisteraar voor doorsturen naar resultaten
socket.on('redirectToResults', (winner) => {
  window.location.href = `/quiz_result?winner=${encodeURIComponent(winner)}`;
});

// Eerste join event emissie
const username = new URLSearchParams(window.location.search).get('username');
const roomName = new URLSearchParams(window.location.search).get('room');
if (username && roomName) {
  socket.emit('join', { username, room: roomName });
}
