import { handleNameInput } from "./app.js";

handleNameInput();

export function handleChat() {
  let socket = io();

  let messages = document.querySelector("section ul");
  let input = document.getElementById("message");
  let userName = sessionStorage.getItem("userName");

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value) {
      socket.emit("message", { name: userName, message: input.value });
      input.value = "";
    }
  });

  socket.on("message", (data) => {
    messages.appendChild(
      Object.assign(document.createElement("li"), {
        textContent: `${data.name}: ${data.message}`,
      })
    );
    messages.scrollTop = messages.scrollHeight;
  });
}
