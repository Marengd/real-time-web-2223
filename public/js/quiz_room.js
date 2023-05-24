// Initialiseer de socket verbinding.
const socket = io();

// Verkrijg de elementen van de DOM.
const countdownElement = document.getElementById('countdown');
const previewElement = document.getElementById('preview');
const optionsElement = document.getElementById('options');
const scoreboardElement = document.getElementById('scoreboard');

// Standaard is de huidige speler geen host.
let isHost = false;

// Event listener voor de update van de algemene countdown.
socket.on('updateCountdown', (countdown) => {
  // Verberg de countdown als deze minder dan 0 is.
  if (countdown < 0) {
    countdownElement.style.display = 'none';
  } else if (countdown === 10) {
    // Geef een bericht weer als de countdown gelijk is aan 10.
    countdownElement.innerText = "Het spel wordt automatisch gestart als er 3 spelers in deze room zitten";
  } else {
    // Toon de countdown
    countdownElement.style.display = 'block';
    countdownElement.innerText = `We beginnen in .. ${countdown}`;
  }
});

// Event listener voor de update van de ronde countdown.
socket.on('updateRoundCountdown', ({ countdown, roundNumber }) => {
  const countdownElement = document.getElementById('roundCountdown');
  // Verberg de countdown als deze gelijk of minder is dan 0.
  if (countdown <= 0) {
    countdownElement.style.display = 'none';
  } else {
    // Toon de countdown voor de volgende ronde.
    countdownElement.style.display = 'block';
    countdownElement.innerText = `Ronde [${roundNumber}] gaat beginnen in ${countdown}...`;

    // Pauzeer het voorbeeld van de track.
    previewElement.pause();
  }
});

// Event listener om de antwoordknoppen te activeren.
socket.on('enableButtons', () => {
  const buttons = optionsElement.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
});

// Event listener om de antwoordknoppen te deactiveren.
socket.on('disableButtons', () => {
  const buttons = optionsElement.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
});

// Event listener voor het ontvangen van een nieuwe vraag.
socket.on('newQuestion', (question) => {
  // Controleer of de huidige speler de host is.
  isHost = socket.id === question.hostId;

  // Stel het voorbeeld van de track en de antwoordopties in.
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

// Event listener voor het afspelen van het track voorbeeld zodra het geladen is.
previewElement.addEventListener('canplaythrough', () => {
  previewElement.play();
});

// Event listener voor het updaten van het scoreboard.
// Event listener voor het updaten van het scoreboard.
socket.on('updateScoreboard', (players) => {
  scoreboardElement.innerHTML = '';
  for (const playerId in players) {
    const player = players[playerId];
    const scoreEntry = document.createElement('div');

    // Als de huidige gebruiker de speler is, voeg dan "(Jij)" toe achter de naam
    if (player.username === username) {
      scoreEntry.innerText = `${player.username} (Jij): ${player.score}`;
    } else {
      scoreEntry.innerText = `${player.username}: ${player.score}`;
    }

    scoreboardElement.appendChild(scoreEntry);
  }
});


// Event listener voor het einde van het track voorbeeld.
previewElement.addEventListener('ended', () => {
  // Als de huidige speler de host is, ga dan naar de volgende ronde.
  if (isHost) {
    socket.emit('nextRound', roomName);
  }
});

// Event listener voor het doorsturen naar de resultatenpagina.
socket.on('redirectToResults', (winner) => {
  window.location.href = `/quiz_result?winner=${encodeURIComponent(winner)}`;
});

// Haal de gebruikersnaam en de naam van de kamer op uit de URL parameters.
const username = new URLSearchParams(window.location.search).get('username');
const roomName = new URLSearchParams(window.location.search).get('room');

// Als beide aanwezig zijn, stuur dan een verzoek om de kamer te betreden.
if (username && roomName) {
  socket.emit('join', { username, room: roomName });
}
