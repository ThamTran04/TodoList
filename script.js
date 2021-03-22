/* eslint-disable no-console */
export default class TodoList extends HTMLElement {
  constructor() {
    super();
  }
  /*
  <div class="container">
    <div class="header">
      <h2>List To Do</h2>
      <button class="insertBtn">Insert</button>
    </div>

    <ul id="myUL"></ul>
  </div>
  */
  connectedCallback() {
    const container = TodoList.initNode("div", this, "container");
    const header = TodoList.initNode("div", container, "header");
    TodoList.initNode("h2", header).innerText = "List To Do";
    const insertButton = TodoList.initNode("button", header, "insertBtn");
    insertButton.innerText = "Insert";
    const ul = TodoList.initNode("ul", container);
    insertButton.addEventListener("click", this.createInputZone);
    ul.addEventListener("click", this.delegateClick);
  }

  static todoList = [];
  static initNode(element = "", parentNode = "", ClasseName = "") {
    const e = document.createElement(element);
    parentNode.appendChild(e);
    e.className = ClasseName;
    return e;
  }

  createInputZone() {
    const header = document.querySelector(".header");
    const inputZone = TodoList.initNode("input", header, "inputZone");
    inputZone.setAttribute("placeholder", "Enter your activiti...");
    this.parentNode.removeChild(this);
    inputZone.addEventListener("keypress", TodoList.addNewTodo);
  }

  // https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
  static addNewTodo(event) {
    const todo = {
      titre: "",
      check: false,
    };

    // const inputZone = document.querySelector(".inputZone");
    if (event.key === "Enter") {
      if (this.value == "") {
        alert("You must write something!");
        return;
      }
      const ul = document.querySelector("ul");
      const li = TodoList.initNode("li", ul);
      TodoList.initNode("span", li).innerText = this.value;
      todo.titre = this.value;
      this.value = "";
      TodoList.todoList.push(todo);
      localStorage.setItem("myList", JSON.stringify(TodoList.todoList));

      TodoList.initNode("button", li, "btn edit").innerText = "edit";
      TodoList.initNode("i", li, "btn delete far fa-minus-square");
      TodoList.initNode("i", li, "btn check far fa-square").setAttribute(
        "id",
        "false"
      );
    }
  }

  // https://stackoverflow.com/questions/42761822/how-would-i-make-event-target-classname-check-for-an-image-inside-of-the-div-nam/42764518
  delegateClick(e) {
    if (e.target.classList.contains("delete")) TodoList.removeActivity(e);
    if (e.target.classList.contains("check")) TodoList.checkActivity(e);
    if (e.target.classList.contains("edit")) TodoList.editActivity(e);
  }

  static removeActivity(e) {
    const attention = confirm("do y want to delete it?");
    if (attention) {
      e.target.parentElement.remove();
      const titre = e.target.previousSibling.previousSibling.textContent;
      TodoList.todoList = TodoList.todoList.filter(
        (item) => item.titre != titre
      );
      localStorage.setItem("myList", JSON.stringify(TodoList.todoList));
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
    TodoList.todoList = TodoList.todoList.map((item) => {
      if (item.titre == titre) {
        if (etatCheck == "true") item.check = true;
        else item.check = false;
      }
      return item;
    });
    localStorage.setItem("myList", JSON.stringify(TodoList.todoList));
  }

  static editActivity(e) {
    const span = e.target.previousSibling;
    const spanOldContent = span.textContent;
    const newText = prompt("your text?", span.innerText);
    if (newText == null || newText == "") alert("y must write something");
    else {
      span.innerText = newText;
      TodoList.todoList = TodoList.todoList.map((item) => {
        if (item.titre == spanOldContent) {
          item.titre = newText;
        }
        return item;
      });
      localStorage.setItem("myList", JSON.stringify(TodoList.todoList));
    }
  }
}

customElements.define("my-todo-list", TodoList);
