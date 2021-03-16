/* eslint-disable no-console */
export default class TodoList {
  constructor() {
    this.insert = document.querySelector(".insertBtn");
    this.todoList = [];
  }

  static initNode(element = "", parent = "", ClasseName = "") {
    const e = document.createElement(element);
    parent.appendChild(e);
    e.className = ClasseName;
    return e;
  }

  createInputZone() {
    const header = document.querySelector(".header");
    const input = TodoList.initNode("input", header, "inputZone");
    input.setAttribute("placeholder", "Enter your activiti...");
    this.parentNode.removeChild(this);
    input.addEventListener("keypress", TodoList.addNewTodo);
  }

  addEventListenerForInsertButton = () => {
    this.insert.addEventListener("click", this.createInputZone);
  };

  // https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
  static addNewTodo(event) {
    const todo = {
      titre: "",
      check: false,
    };

    const inputZone = document.querySelector(".inputZone");
    if (event.key === "Enter") {
      if (inputZone.value == "") {
        alert("You must write something!");
        return;
      }
      const ul = document.querySelector("ul");
      const li = TodoList.initNode("li", ul);
      TodoList.initNode("span", li).innerText = inputZone.value;
      todo.titre = inputZone.value;
      inputZone.value = "";

      // TodoList.todoList.push(todo);
      console.log(todo);
      // localStorage.setItem("myList", JSON.stringify(todoList));

      TodoList.initNode("button", li, "btn edit").innerText = "edit";
      TodoList.initNode("i", li, "btn delete far fa-minus-square");
      TodoList.initNode("i", li, "btn check far fa-square").setAttribute(
        "id",
        "false"
      );
    }
  }

  // https://stackoverflow.com/questions/42761822/how-would-i-make-event-target-classname-check-for-an-image-inside-of-the-div-nam/42764518
  addEventListenerForEachActivity() {
    document.querySelector("ul").addEventListener("click", this.delegation);
  }

  delegation(e) {
    console.log(this);
    if (e.target.classList.contains("delete")) TodoList.removeActivity(e);
    if (e.target.classList.contains("check")) TodoList.checkActivity(e);
    if (e.target.classList.contains("edit")) TodoList.editActivity(e);
  }

  static removeActivity(e) {
    const attention = confirm("do y want to delete it?");
    if (attention) {
      e.target.parentElement.remove();
      const titre = e.target.previousSibling.previousSibling.textContent;
      todoList = todoList.filter((item) => item.titre != titre);
      localStorage.setItem("myList", JSON.stringify(todoList));
    }
  }

  static checkActivity(e) {
    switch (e.target.id) {
      case "false":
        TodoList.updateCheckActivity(
          e,
          "true",
          "btn check far fa-check-square",
          "rgb(178, 217, 224)"
        );
        break;
      case "true":
        TodoList.updateCheckActivity(
          e,
          "false",
          "btn check far fa-square",
          "white"
        );
        break;
    }
  }

  static updateCheckActivity(
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

  static editActivity(e) {
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
}
