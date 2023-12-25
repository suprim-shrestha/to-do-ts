import "normalize.css";
import "./styles/style.css";
import deleteIcon from "/assets/delete-button.svg";

import { Task } from "./Task";

const taskForm = document.getElementById("task-form");
const inputField = document.getElementById("input-field") as HTMLInputElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;

const taskListElement = document.getElementById("tasks-list")!;
const allTasks = document.getElementById("all-tasks")!;
const completedTasks = document.getElementById("completed-tasks")!;
const incompleteTasks = document.getElementById("incomplete-tasks")!;

const taskList: Task[] = [];

let displayAllTasks = true;
let displayCompleted = true;

searchInput.addEventListener("input", () => renderTasks());

if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });
}

function addTask() {
  const taskValue: string = inputField.value;
  if (taskValue.trim() !== "") {
    const task = new Task(taskValue);
    taskList.push(task);
    inputField.value = "";
    renderTasks();
  }
}

function renderTasks() {
  taskListElement.innerHTML = "";
  const list = getTaskListByStatus(displayAllTasks, displayCompleted);
  list.forEach((task, index) => {
    addToList(task, index, taskListElement);
  });
}

function addToList(task: Task, index: number, taskListElement: HTMLElement) {
  const searchText = searchInput.value.toLowerCase();
  if (task.value.toLowerCase().includes(searchText)) {
    const li = document.createElement("li");
    li.textContent = task.value;
    li.className = "tasks__list-item";

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "tasks__button";

    const completeBtn = document.createElement("button");
    completeBtn.className = "tasks__button-complete";
    completeBtn.onclick = () => {
      toggleTaskCompleted(index);
    };
    buttonDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<img src="${deleteIcon}" alt="Delete Icon" />`;
    deleteBtn.className = "tasks__button-delete";
    deleteBtn.onclick = () => {
      deleteTask(index);
    };
    buttonDiv.appendChild(deleteBtn);

    if (task.completed) {
      li.className += " task--completed";
    }
    li.appendChild(buttonDiv);

    taskListElement.appendChild(li);
  }
}

function toggleTaskCompleted(index: number) {
  taskList[index].toggleCompleted();
  renderTasks();
}

function deleteTask(index: number) {
  taskList.splice(index, 1);
  renderTasks();
}

function getTaskListByStatus(allTasks: boolean, completed: boolean): Task[] {
  if (allTasks) {
    return taskList;
  }
  const newList = taskList.filter((task) => {
    return task.completed === completed;
  });
  return newList;
}

allTasks.addEventListener("click", () => {
  allTasks.classList.add("tasks__selector--active");
  completedTasks.classList.remove("tasks__selector--active");
  incompleteTasks.classList.remove("tasks__selector--active");
  displayAllTasks = true;
  renderTasks();
});
completedTasks.addEventListener("click", () => {
  allTasks.classList.remove("tasks__selector--active");
  completedTasks.classList.add("tasks__selector--active");
  incompleteTasks.classList.remove("tasks__selector--active");
  displayAllTasks = false;
  displayCompleted = true;
  renderTasks();
});
incompleteTasks.addEventListener("click", () => {
  allTasks.classList.remove("tasks__selector--active");
  completedTasks.classList.remove("tasks__selector--active");
  incompleteTasks.classList.add("tasks__selector--active");
  displayAllTasks = false;
  displayCompleted = false;
  renderTasks();
});
