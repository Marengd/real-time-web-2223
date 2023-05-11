const socket = io();

const enterUsernameForm = document.getElementById('enter-username-form');
if (enterUsernameForm) {
  enterUsernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    window.location.href = `/create_or_join?username=${encodeURIComponent(username)}`;
  });
}
