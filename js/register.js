function isUserLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.pathname = "tasks.html";
  } else {
    document.querySelector("body").classList.remove("hidden");
  }
}

isUserLoggedIn();

const checkIfUserIsLoggedInInterval = setInterval(function () {
  isUserLoggedIn();
}, 1000);

function register() {
  const name = document.getElementById("register-name").value;
  const lastName = document.getElementById("register-lastname").value;
  const userName = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (name && lastName && userName && password) {
    const requestData = {
      name,
      lastName,
      userName,
      password,
    };

    fetch("https://localhost:7034/api/Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (response) {
        localStorage.setItem("token", response.token);
        window.location.pathname = "tasks.html";
      })
      .catch(function () {
        document.getElementById("register-error").innerText = "Diçka shkoi keq";
      });
  }
}
