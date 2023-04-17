function handleChat() {
  // Get the user's name from session storage, or set it to "anonymous" if not provided.
  const userName = sessionStorage.getItem("userName") || "anonymous";

  // Initialize the Socket.IO client with the user's name as a query parameter.
  let socket = io({ query: { userName } });

  // Select the messages list and message input from the DOM.
  let messages = document.querySelector("section ul");
  let input = document.querySelector("#message");

  // Add a submit event listener to the form.
  document.querySelector("form").addEventListener("submit", (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Check if the input has a value.
    if (input.value) {
      // Emit a "message" event to the server with the user's name and message.
      socket.emit("message", { name: userName, message: input.value });

      // Clear the input after sending the message.
      input.value = "";
    }
  });

  // Add an event listener for receiving "message" events from the server.
  socket.on("message", (data) => {
    // Create a new list item element and set its text content to the received message.
    messages.appendChild(
      Object.assign(document.createElement("li"), {
        textContent: `${data.name}: ${data.message}`,
      })
    );

    // Scroll the messages list to the bottom to display the latest message.
    messages.scrollTop = messages.scrollHeight;
  });

  // Add an event listener for receiving "user-connected" events from the server.
  socket.on("user-connected", (message) => {
    messages.appendChild(
      Object.assign(document.createElement("li"), {
        textContent: message,
        className: "connected"
      })
    );
    messages.scrollTop = messages.scrollHeight;
  });

  // Add an event listener for receiving "user-disconnected" events from the server.
  socket.on("user-disconnected", (message) => {
    messages.appendChild(
      Object.assign(document.createElement("li"), {
        textContent: message,
        className: "disconnected"
      })
    );
    messages.scrollTop = messages.scrollHeight;
  });
}

// Call the handleChat function.
handleChat();
