function isUserLoggedIn() {
  const token = localStorage.getItem("token");
  if (token === null) {
    window.location.pathname = "index.html";
  } else {
    document.querySelector("body").classList.remove("hidden");
  }
}

isUserLoggedIn();

const checkIfUserIsLoggedInInterval = setInterval(function () {
  isUserLoggedIn();
}, 100);

const copyOfUserData = {
  userName: "",
  name: "",
  lastName: "",
};

function getUserData() {
  const token = localStorage.getItem("token");

  fetch("https://localhost:7034/api/User/UserDataByUserName", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function (response) {
      document.getElementById("loading-box").remove();

      const userDataForm = document.getElementById("user-data-form");
      const passwordSectionTitle = document.getElementById(
        "password-section-title"
      );

      userDataForm.classList.remove("hidden");
      passwordSectionTitle.classList.remove("hidden");
      userDataForm.classList.add("flex");
      passwordSectionTitle.classList.add("block");

      copyOfUserData.userName = response.userName;
      copyOfUserData.name = response.name;
      copyOfUserData.lastName = response.lastName;
      document.getElementById("user-data-username").value = response.userName;
      document.getElementById("user-data-name").value = response.name;
      document.getElementById("user-data-last-name").value = response.lastName;
    })
    .catch(function () {
      console.log("Something went wrong");
    });
}

getUserData();

function toggleEditMode() {
  let newMode = undefined;

  if (
    document
      .getElementById("user-data-form-input-fields")
      .classList.contains("pointer-events-none")
  ) {
    newMode = "EDIT";
  } else {
    newMode = "VIEW";
  }

  if (newMode === "EDIT") {
    document
      .getElementById("user-data-form-input-fields")
      .classList.remove("pointer-events-none");
    const parentElement = document.getElementById(
      "user-data-form-input-fields"
    );

    Array.from(parentElement.children).forEach((child) => {
      child.classList.add("bg-gray-200");
    });

    document
      .getElementById("user-data-form-action-buttons-container")
      .classList.remove("hidden");
    document
      .getElementById("user-data-form-action-buttons-container")
      .classList.add("flex");
    document
      .getElementById("user-data-form-edit-button")
      .classList.add("hidden");
  }

  if (newMode === "VIEW") {
    document
      .getElementById("user-data-form-input-fields")
      .classList.add("pointer-events-none");
    const parentElement = document.getElementById(
      "user-data-form-input-fields"
    );

    Array.from(parentElement.children).forEach((child) => {
      child.classList.remove("bg-gray-200");
    });

    document
      .getElementById("user-data-form-action-buttons-container")
      .classList.remove("flex");
    document
      .getElementById("user-data-form-action-buttons-container")
      .classList.add("hidden");
    document
      .getElementById("user-data-form-edit-button")
      .classList.remove("hidden");
  }
}

function togglePasswordMode() {
  let newMode = undefined;

  if (document.getElementById("password-form").classList.contains("hidden")) {
    newMode = "EDIT";
  } else {
    newMode = "VIEW";
  }

  if (newMode === "EDIT") {
    document.getElementById("password-form").classList.remove("hidden");
    document.getElementById("password-form").classList.add("flex");
    document
      .getElementById("password-form-edit-button")
      .classList.add("hidden");
  }

  if (newMode === "VIEW") {
    document.getElementById("password-form").classList.remove("flex");
    document.getElementById("password-form").classList.add("hidden");
    document
      .getElementById("password-form-edit-button")
      .classList.remove("hidden");
  }
}

function editUserDataSubmit() {}

function editUserDataSubmit() {
  const token = localStorage.getItem("token");
  const userName = document.getElementById("user-data-username").value;
  const name = document.getElementById("user-data-name").value;
  const lastName = document.getElementById("user-data-last-name").value;

  if (userName && name && lastName) {
    const requestData = {
      userName,
      name,
      lastName,
    };

    fetch(`https://localhost:7034/api/User/EditUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
      })
      .then(function () {
        (copyOfUserData.userName = userName),
          (copyOfUserData.name = name),
          (copyOfUserData.lastName = lastName);

        document.getElementById("edit-user-data-error").innerText = "";
        toggleEditMode();
      })
      .catch(function () {
        document.getElementById("edit-user-data-error").innerText =
          "Nuk mund të ndryshojm të dhënat.";
      });
  }
}

function resetEditData() {
  document.getElementById("user-data-username").value = copyOfUserData.userName;
  document.getElementById("user-data-name").value = copyOfUserData.name;
  document.getElementById("user-data-last-name").value =
    copyOfUserData.lastName;
}

function editUserPasswordSubmit() {
  const token = localStorage.getItem("token");
  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;

  if (oldPassword && newPassword) {
    const requestData = {
      oldPassword,
      newPassword,
    };

    fetch(`https://localhost:7034/api/User/EditUserPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
      })
      .then(function () {
        resetPasswordData();
        togglePasswordMode();
        document.getElementById("edit-password-error").innerText = "";
      })
      .catch(function () {
        document.getElementById("edit-password-error").innerText =
          "Nuk mund të ndryshojm fjalëkalimin.";
      });
  }
}

function resetPasswordData() {
  document.getElementById("old-password").value = "";
  document.getElementById("new-password").value = "";
}
