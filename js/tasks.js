// kontrolln nese perdoruesi eshte i kycur
function isUserLoggedIn() {
  const token = localStorage.getItem("token");
  if (token === null) {
    window.location.pathname = "index.html";
  }
}

isUserLoggedIn();

const checkIfUserIsLoggedInInterval = setInterval(function () {
  isUserLoggedIn();
}, 1000);

function logout() {
  localStorage.removeItem("token");
  window.location.pathname = "index.html";
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatDateToYYYYMMDD(dateString) {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    throw new Error("Invalid date format");
  }
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return `${year}-${month}-${day}`;
}

function hasTimePassed(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();

  return givenDate < currentDate;
}

function renderTask(task) {
  const taskContainer = document.getElementById("tasks-container");
  const newTask = document.createElement("div");
  newTask.className = `flex items-center gap-2 pr-2`;

  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.className = "flex flex-col gap-2";

  const deleteButton = document.createElement("button");
  actionButtonsContainer.appendChild(deleteButton);
  deleteButton.className =
    "bg-red-100 hover:bg-red-200 h-7 w-16 rounded-md border-2 border-red-200 text-red-500 font-semibold transition duration-150";
  deleteButton.innerText = "Delete";
  deleteButton.onclick = function () {
    deleteTask(task.taskId);
  };

  const editButton = document.createElement("button");
  actionButtonsContainer.appendChild(editButton);
  editButton.className =
    "h-7 w-16 rounded-md font-semibold bg-white hover:bg-gray-100 transition duration-150";
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    showEditTaskDialog(task.taskId);
  };

  const button = document.createElement("button");

  button.id = `task-${task.taskId}`;
  button.setAttribute("data-deadline-date", task.deadline);
  button.className = `text-left border-2 hover:shadow-lg hover:scale-[1.01] transition-all duration-150 ease-in-out !cursor-default rounded-lg w-full px-4 py-3 flex items-center gap-2 select-none ${
    hasTimePassed(task.deadline) && task.status === "UNFINISHED"
      ? "bg-red-100 border-red-200"
      : hasTimePassed(task.deadline) && task.status === "FINISHED"
      ? "bg-green-100 border-green-200"
      : "border-gray-200"
  }`;
  button.setAttribute("onSubmit", "taskToggle()");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "accent-black !cursor-pointer";
  checkbox.id = `checkbox-${task.taskId}`;
  checkbox.onclick = function () {
    taskToggle(task.taskId);
  };
  if (task.status === "FINISHED") {
    checkbox.checked = true;
  }

  const titleLabel = document.createElement("label");
  titleLabel.id = `task-title-${task.taskId}`;
  titleLabel.textContent = task.title;
  titleLabel.htmlFor = `checkbox-${task.taskId}`;
  titleLabel.className = `!cursor-pointer px-2 font-medium ${
    hasTimePassed(task.deadline) ? "line-through" : ""
  }`;
  titleLabel.textContent = task.title;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.id = `task-description-${task.taskId}`;
  descriptionLabel.textContent = task.description;
  descriptionLabel.htmlFor = `checkbox-${task.taskId}`;
  descriptionLabel.className = `!cursor-pointer px-2 text-sm text-gray-500 ${
    hasTimePassed(task.deadline) ? "line-through" : ""
  }`;
  descriptionLabel.textContent = task.description;

  const deadlineDateP = document.createElement("p");
  deadlineDateP.id = `task-deadline-date-${task.taskId}`;
  deadlineDateP.textContent = formatDate(task.deadline);

  deadlineDateP.className = "text-sm text-gray-500 font-semibold";
  deadlineDateP.textContent = formatDate(task.deadline);
  const flexContainer = document.createElement("div");
  flexContainer.className = "flex-1 flex flex-col justify-center";
  flexContainer.append(titleLabel, descriptionLabel);
  button.append(checkbox, flexContainer, deadlineDateP);

  newTask.append(button);
  newTask.appendChild(actionButtonsContainer);
  taskContainer.append(newTask);
}

function getTasks() {
  const token = localStorage.getItem("token");

  fetch(`https://localhost:7034/api/UserTask/GetAllUserTasks/`, {
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
    .then(function (tasks) {
      const loadingBox = document.getElementById("loading-box");
      if (loadingBox) {
        loadingBox.remove();
      }
      tasks.map(function (task) {
        renderTask(task);
      });
    })
    .catch(function () {
      const loadingBox = document.getElementById("loading-box");
      if (loadingBox) {
        loadingBox.remove();
      }
    });

  // fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then(function (response) {
  //         // ktu ty spupozohet te vi nje array nga BE
  //         // tasks = json

  //         const DUMMY_TASKS = [
  //             {
  //                 id: "task1",
  //                 deadline: "2023-06-15T13:45:30",
  //                 title: "Title 1 lorem ipsum",
  //                 description: "Description 1 ",
  //                 status: "UNFINISHED",
  //             },
  //             {
  //                 id: "task2",
  //                 deadline: "2025-06-15T13:45:30",
  //                 title: "Title 1 lorem ipsum",
  //                 description: "Description 1 lorem ipsum dlor asmet",
  //                 status: "UNFINISHED",
  //             },
  //             {
  //                 id: "task3",
  //                 deadline: "2025-06-15T13:45:30",
  //                 title: "Title 1 lorem ipsum",
  //                 description: "Description 1 lorem ipsum dlor asmet",
  //                 status: "UNFINISHED",
  //             },
  //         ];
  //         return DUMMY_TASKS;
  //         // return response.json();
  //     })
  //     .then(function (tasks) {
  //         const loadingBox = document.getElementById("loading-box")
  //         if (loadingBox) {
  //             loadingBox.remove()
  //         }
  //         tasks.map(function (task) {
  //             renderTask(task)
  //         });
  //     });
}

getTasks();

function taskToggle(taskId) {
  const taskElement = document.getElementById(`task-${taskId}`);
  const checkbox = document.getElementById(`checkbox-${taskId}`);
  const newStatus = checkbox.checked ? "FINISHED" : "UNFINISHED";
  const taskDeadlineDatePassed = hasTimePassed(
    taskElement.getAttribute("data-deadline-date")
  );

  updateTaskUI(taskElement, checkbox.checked, taskDeadlineDatePassed);

  updateTaskStatus(taskId, newStatus)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      taskElement.setAttribute("data-status", newStatus);
      document
        .getElementById("update-task-status-error")
        .classList.add("hidden");
    })
    .catch(function () {
      checkbox.checked = !checkbox.checked;
      updateTaskUI(taskElement, checkbox.checked, taskDeadlineDatePassed);

      document.getElementById("update-task-status-error").innerText =
        "Unable to change task status.";
      document
        .getElementById("update-task-status-error")
        .classList.remove("hidden");
    });
}

function updateTaskUI(taskElement, isChecked, deadlineDatePassed) {
  taskElement.classList.remove(
    "bg-red-100",
    "border-red-200",
    "bg-green-100",
    "border-green-200",
    "bg-white",
    "border-gray-200"
  );

  if (isChecked) {
    taskElement.classList.add("bg-green-100");
    taskElement.classList.add("border-green-200");
  } else {
    taskElement.classList.add(deadlineDatePassed ? "bg-red-100" : "bg-white");
    taskElement.classList.add(
      deadlineDatePassed ? "border-red-200" : "border-gray-200"
    );
  }
}

function updateTaskStatus(taskId, newStatus) {
  const token = localStorage.getItem("token");

  const requestData = {
    isFinished: newStatus === "FINISHED" ? true : false,
  };

  return fetch(`https://localhost:7034/api/UserTask/ChangeStatus/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });
}

function deleteTask(taskId) {
  const token = localStorage.getItem("token");
  const task = document.getElementById(`task-${taskId}`);

  fetch(`https://localhost:7034/api/UserTask/DeleteTask/${taskId}`, {
    method: "DELETE",
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
    .then(function () {
      if (task && task.parentElement) {
        task.parentElement.remove();
        document.getElementById("delete-task-error").classList.add("hidden");
      }
    })
    .catch(function () {
      document.getElementById("delete-task-error").innerText =
        "Unable to delete task.";
      document.getElementById("delete-task-error").classList.remove("hidden");
    });
}

let taskOnEditID = undefined;

const editTaskDialog = document.getElementById("edit-task-dialog");

function showEditTaskDialog(taskId) {
  taskOnEditID = taskId;

  const title = document.getElementById(`task-title-${taskId}`).innerText;
  const description = document.getElementById(
    `task-description-${taskId}`
  ).innerText;
  const deadlineDate = document.getElementById(
    `task-deadline-date-${taskId}`
  ).innerText;

  if (title && description && deadlineDate) {
    document.getElementById("edit-task-dialog-title").value = title;
    document.getElementById("edit-task-dialog-description").value = description;
    document.getElementById("edit-task-dialog-deadline-date").value =
      formatDateToYYYYMMDD(deadlineDate);
  }

  editTaskDialog.showModal();
}

function editTaskDialogSubmit() {
  const token = localStorage.getItem("token");
  const title = document.getElementById("edit-task-dialog-title").value;
  const description = document.getElementById(
    "edit-task-dialog-description"
  ).value;
  const deadlineDate = document.getElementById(
    "edit-task-dialog-deadline-date"
  ).value;

  const requestData = {
    title: title,
    description: description,
    deadLine: deadlineDate,
  };

  fetch(`https://localhost:7034/api/UserTask/EditTask/${taskOnEditID}`, {
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
      return response.json();
    })
    .then(function () {
      document.getElementById(`task-title-${taskOnEditID}`).textContent = title;
      document.getElementById(`task-description-${taskOnEditID}`).textContent =
        description;
      document.getElementById(
        `task-deadline-date-${taskOnEditID}`
      ).textContent = formatDate(deadlineDate);
      closeEditTaskDialog();
    })
    .catch(function () {
      document.getElementById("edit-task-error").innerText =
        "Something went wrong";
    });
}

function closeEditTaskDialog() {
  taskOnEditID = undefined;

  document.getElementById("edit-task-dialog-title").value = "";
  document.getElementById("edit-task-dialog-description").value = "";
  document.getElementById("edit-task-dialog-deadline-date").value = "";

  editTaskDialog.close();
}

const addTaskDialog = document.getElementById("add-task-dialog");

function showAddTaskDialog() {
  addTaskDialog.showModal();
}

function addTaskDialogSubmit() {
  const title = document.getElementById("add-task-dialog-title").value;
  const description = document.getElementById(
    "add-task-dialog-description"
  ).value;
  const deadlineDate = document.getElementById(
    "add-task-dialog-deadline-date"
  ).value;
  console.log(deadlineDate, "dedline date log");

  const requestData = {
    title: title,
    description: description,
    deadLine: deadlineDate,
  };

  const token = localStorage.getItem("token");

  fetch("https://localhost:7034/api/UserTask/AddTask", {
    method: "POST",
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
      return response.json();
    })
    .then(function (response) {
      renderTask({
        id: response.taskId,
        deadline: deadlineDate,
        title: title,
        description: description,
        status: "UNFINISHED",
      });
      closeAddTaskDialog();
    })
    .catch(function () {
      document.getElementById("add-task-error").innerText =
        "Something went wrong";
    });
}

function closeAddTaskDialog() {
  document.getElementById("add-task-dialog-title").value = "";
  document.getElementById("add-task-dialog-description").value = "";
  document.getElementById("add-task-dialog-deadline-date").value = "";

  addTaskDialog.close();
}
