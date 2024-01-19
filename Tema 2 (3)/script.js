document.addEventListener("DOMContentLoaded", function () {
    const tasksList = document.getElementById("tasks");
    const newTaskInput = document.getElementById("newTask");
    const addTaskButton = document.getElementById("addTask");
  
    addTaskButton.addEventListener("click", addTask);
  
    // Afisare sarcini stocate in localStorage la incarcarea paginii
    displayTasksFromStorage();
  
    function addTask() {
      const taskText = newTaskInput.value.trim();
  
      if (taskText !== "") {
        const task = { text: taskText, completed: false };
        saveTask(task);
        displayTask(task);
        newTaskInput.value = "";
      }
    }
  
    function displayTask(task) {
      const taskItem = document.createElement("li");
      taskItem.className = "task";
      taskItem.innerHTML = `
        <span>${task.text}</span>
        <button class="deleteTask" onclick="deleteTask('${task.text}')">Șterge</button>
        <button class="editTask" onclick="editTask('${task.text}')">Editează</button>
        <button class="completeTask" onclick="completeTask('${task.text}')">Completată</button>
      `;
      tasksList.appendChild(taskItem);
    }
  
    function saveTask(task) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function displayTasksFromStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        displayTask(task);
      });
    }
  
    window.deleteTask = function (taskText) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => task.text !== taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      refreshTasksList();
    };
  
    window.editTask = function (taskText) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTaskText = prompt("Editați sarcina:", taskText);
  
      if (updatedTaskText !== null) {
        tasks.forEach(task => {
          if (task.text === taskText) {
            task.text = updatedTaskText;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        refreshTasksList();
      }
    };
  
    window.completeTask = function (taskText) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        if (task.text === taskText) {
          task.completed = !task.completed;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      refreshTasksList();
    };
  
    function refreshTasksList() {
      tasksList.innerHTML = "";
      displayTasksFromStorage();
    }
  });
  