import "normalize.css";
import "./styles/style.css";
import deleteIcon from "/assets/delete-button.svg";

type Task = {
  task: string;
  isCompleted: boolean;
};

const tasks: Task[] = [];

const taskForm = document.getElementById("task-form");
const inputField = document.getElementById("input-field") as HTMLInputElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;

if (searchInput) {
  searchInput.addEventListener("input", () => renderTasks());
}

if (taskForm) {
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });
}

const addTask = () => {
  const taskValue: string = inputField.value;
  if (taskValue.trim() !== "") {
    tasks.push({ task: taskValue, isCompleted: false });
    inputField.value = "";
    renderTasks();
  }
};

const renderTasks = () => {
  renderAllTasks();
  renderCompletedTasks();
  renderIncompleteTasks();
};

const addToList = (taskObj: Task, index: number, taskList: HTMLElement) => {
  const searchText = searchInput.value.toLowerCase();
  if (taskObj.task.toLowerCase().includes(searchText)) {
    const li = document.createElement("li");
    li.textContent = taskObj.task;
    li.className = "tasks__list-item";

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "tasks__button";

    const completeBtn = document.createElement("button");
    completeBtn.className = "tasks__button-complete";
    completeBtn.onclick = () => {
      toggleTaskCompletion(index);
    };
    buttonDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<img src="${deleteIcon}" alt="Delete Icon" />`;
    deleteBtn.className = "tasks__button-delete";
    deleteBtn.onclick = () => {
      deleteTask(index);
    };
    buttonDiv.appendChild(deleteBtn);

    if (taskObj.isCompleted) {
      li.className += " task--completed";
    }
    li.appendChild(buttonDiv);

    taskList.appendChild(li);
  }
};

const renderAllTasks = () => {
  const taskList = document.getElementById("all-tasks-list");
  if (taskList) {
    taskList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
      addToList(taskObj, index, taskList);
    });
  }
};

const renderCompletedTasks = () => {
  const taskList = document.getElementById("completed-tasks-list");
  if (taskList) {
    taskList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
      if (taskObj.isCompleted) {
        addToList(taskObj, index, taskList);
      }
    });
  }
};

const renderIncompleteTasks = () => {
  const taskList = document.getElementById("incomplete-tasks-list");
  if (taskList) {
    taskList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
      if (!taskObj.isCompleted) {
        addToList(taskObj, index, taskList);
      }
    });
  }
};

const toggleTaskCompletion = (index: number) => {
  tasks[index].isCompleted = !tasks[index].isCompleted;
  renderTasks();
};

function deleteTask(index: number) {
  tasks.splice(index, 1);
  renderTasks();
}

const allTasks = document.getElementById("all-tasks");
const completedTasks = document.getElementById("completed-tasks");
const incompleteTasks = document.getElementById("incomplete-tasks");
const allTasksTop = document.getElementById("all-tasks-top");
const completedTasksTop = document.getElementById("completed-tasks-top");
const incompleteTasksTop = document.getElementById("incomplete-tasks-top");

if (
  allTasks &&
  completedTasks &&
  incompleteTasks &&
  allTasksTop &&
  completedTasksTop &&
  incompleteTasksTop
) {
  allTasksTop.addEventListener("click", () => {
    allTasks.style.display = "block";
    completedTasks.style.display = "none";
    incompleteTasks.style.display = "none";
    allTasksTop.style.boxShadow = "0px 40px 30px -30px rgba(0,0,0,0.5) inset";
    completedTasksTop.style.boxShadow = "none";
    incompleteTasksTop.style.boxShadow = "none";
  });
  completedTasksTop.addEventListener("click", () => {
    allTasks.style.display = "none";
    completedTasks.style.display = "block";
    incompleteTasks.style.display = "none";
    allTasksTop.style.boxShadow = "none";
    completedTasksTop.style.boxShadow =
      "0px 40px 30px -30px rgba(0,0,0,0.5) inset";
    incompleteTasksTop.style.boxShadow = "none";
  });
  incompleteTasksTop.addEventListener("click", () => {
    allTasks.style.display = "none";
    completedTasks.style.display = "none";
    incompleteTasks.style.display = "block";
    allTasksTop.style.boxShadow = "none";
    completedTasksTop.style.boxShadow = "none";
    incompleteTasksTop.style.boxShadow =
      "0px 40px 30px -30px rgba(0,0,0,0.5) inset";
  });
}
