function handleNameInput() {
  document.querySelector("#name-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const userName = document.getElementById("user-name").value;
    if (userName) {
      sessionStorage.setItem("userName", userName);
      window.location.href = "/chat";
    }
  });
}

handleNameInput();
