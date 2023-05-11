const socket = io();

const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');

const username = new URLSearchParams(window.location.search).get('username');

createRoomBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('createRoom');
});

socket.on('roomCreated', (roomName) => {
  window.location.href = `/quiz_room?username=${encodeURIComponent(username)}&room=${encodeURIComponent(roomName)}`;
});


joinRoomBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = `/join_by_id?username=${encodeURIComponent(username)}`;
});

