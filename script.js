/* eslint-disable no-console */
const insert = document.querySelector(".insertBtn");
const createInputZone = () => {
  const header = document.querySelector(".header");
  const input = createElement("input", header, "inputZone");
  input.setAttribute("placeholder", "Enter your activiti...");
  // insert.parentNode.removeChild(insert);
  insert.removeEventListener("click", createInputZone);
  input.addEventListener("keypress", inputAction);
};
insert.addEventListener("click", createInputZone);

let todoList = [];

// https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
function inputAction(event) {
  const todo = {
    titre: "",
    check: false,
  };
  const inputZone = document.querySelector(".inputZone");
  if (event.key === "Enter") {
    if (inputZone.value == "") alert("You must write something!");
    const ul = document.querySelector("ul");
    const li = createElement("li", ul);
    const span = createElement("span", li);
    span.innerText = inputZone.value;
    todo.titre = span.textContent;
    todoList.push(todo);
    localStorage.setItem("myList", JSON.stringify(todoList));
    inputZone.value = "";

    const ed = createElement("button", li, "btn edit");
    ed.innerText = "edit";

    const del = createElement("i", li, "btn delete far fa-minus-square");

    const check = createElement("i", li, "btn check far fa-square");
    check.setAttribute("id", "false");
  }
}

function createElement(element = "", parent = null, ClasseName = "") {
  const e = document.createElement(element);
  parent.appendChild(e);
  e.className = ClasseName;
  return e;
}

// https://stackoverflow.com/questions/42761822/how-would-i-make-event-target-classname-check-for-an-image-inside-of-the-div-nam/42764518
document.querySelector("ul").addEventListener("click", delegation);

function delegation(e) {
  if (e.target.classList.contains("delete")) removeActivity(e);
  if (e.target.classList.contains("check")) checkActivity(e);
  if (e.target.classList.contains("edit")) editActivity(e);
}

function removeActivity(e) {
  const attention = confirm("do y want to delete it?");
  if (attention) {
    e.target.parentElement.remove();
    const titre = e.target.previousSibling.previousSibling.textContent;
    todoList = todoList.filter((item) => item.titre != titre);
    localStorage.setItem("myList", JSON.stringify(todoList));
  }
}

function checkActivity(e) {
  switch (e.target.id) {
    case "false":
      updateCheckActivity(
        e,
        "true",
        "btn check far fa-check-square",
        "rgb(178, 217, 224)"
      );
      break;
    case "true":
      updateCheckActivity(e, "false", "btn check far fa-square", "white");
      break;
  }
}

function updateCheckActivity(
  e,
  etatCheck = "false",
  className = "",
  backgroundColor = ""
) {
  e.target.id = etatCheck;
  e.target.className = className;
  e.target.parentElement.style.backgroundColor = backgroundColor;
  const titre = e.target.parentElement.firstChild.textContent;
  todoList = todoList.map((item) => {
    if (item.titre == titre) {
      if (etatCheck == "true") item.check = true;
      else item.check = false;
    }
    return item;
  });
  localStorage.setItem("myList", JSON.stringify(todoList));
}

function editActivity(e) {
  const span = e.target.previousSibling;
  const spanOldContent = span.textContent;
  const newText = prompt("your text?", span.innerText);
  if (newText == null || newText == "") alert("y must write something");
  else {
    span.innerText = newText;
    todoList = todoList.map((item) => {
      if (item.titre == spanOldContent) {
        item.titre = newText;
      }
      return item;
    });
    localStorage.setItem("myList", JSON.stringify(todoList));
  }
}
