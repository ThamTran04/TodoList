/* eslint-disable no-console */
const insert = document.querySelector(".insertBtn");
const createInputZone = () => {
  const header = document.querySelector(".header");
  const input = createElement("input", header, "inputZone");
  input.setAttribute("valu", "");
  input.setAttribute("placeholder", "Enter your activiti...");
  // insert.parentNode.removeChild(insert);
  insert.removeEventListener("click", createInputZone);
  input.addEventListener("keypress", inputAction);
};
insert.addEventListener("click", createInputZone);

//neu createInputZone duoc khai bao là variable thi instruction: insert.addEventListener("click", createInputZone) phai nam duoi khai bao vi tinh chat hoisting: voi variable, chi hoisting variable chu k hoisting valeur cua no. Voi function thi lai khac

let todoList = [];

// https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
function inputAction(event) {
  const inputZone = document.querySelector(".inputZone");
  if (event.key === "Enter") {
    if (inputZone.value == "") alert("You must write something!");
    const ul = document.querySelector("ul");
    const li = createElement("li", ul);
    const span = createElement("span", li);
    span.innerText = inputZone.value;
    const todo = {
      titre: span.textContent,
      check: "false",
    };

    todoList.push(todo);
    localStorage.setItem("myList", JSON.stringify(todoList));
    inputZone.value = "";

    //edit button
    const ed = createElement("button", li, "btn edit");
    ed.innerHTML = "edit";
    ed.addEventListener("click", editElement);
    function editElement() {
      const span = this.previousSibling;
      const newText = prompt("your text?", span.innerHTML);
      if (newText == null || newText == "") alert("y must write something");
      else {
        span.innerText = newText;
        todo.titre = newText;
        localStorage.setItem("myList", JSON.stringify(todoList));
      }
    }

    //remove button
    const del = createElement("i", li, "btn delete far fa-minus-square");
    // const removeElement = () => {
    //   const attention = confirm("do y want to delete it?");
    //   if (attention) {
    //     todoList = todoList.filter((item) => item !== todo);
    //     localStorage.setItem("myList", JSON.stringify(todoList));
    //     del.parentElement.remove(); //trong truong hop nay this!=del
    //   }
    // };
    // function removeElement1() {
    //   const attention = confirm("do y want to delete it?");
    //   if (attention) {
    //     todoList = todoList.filter((item) => item !== todo);
    //     localStorage.setItem("myList", JSON.stringify(todoList));
    //     del.parentElement.remove(); //trong truong hop nay this==del
    //   }
    // }
    // del.addEventListener("click", removeElement);

    // check button
    const check = createElement("i", li, "btn check far fa-square");
    check.setAttribute("id", "false");
    check.addEventListener("click", checkElement);
    let clickCounter = 0;
    function checkElement(event) {
      clickCounter++;
      if (clickCounter % 2 == 1) {
        check.setAttribute("id", "true");
        todo.check = check.id;
        localStorage.setItem("myList", JSON.stringify(todoList));
        check.className = "btn check far fa-check-square";
        event.target.parentElement.style.backgroundColor = "rgb(178, 217, 224)";
      }
      if (clickCounter % 2 == 0) {
        check.setAttribute("id", "false");
        todo.check = check.id;
        localStorage.setItem("myList", JSON.stringify(todoList));
        this.className = "btn check far fa-square"; //this=check
        event.currentTarget.parentElement.style.backgroundColor = " #f9f9f9";
      }
    }
  }
}

function createElement(element = "", parent = null, ClasseName = "") {
  const e = document.createElement(element);
  parent.appendChild(e);
  e.className = ClasseName;
  return e;
}

// ------------------------------------
// https://stackoverflow.com/questions/42761822/how-would-i-make-event-target-classname-check-for-an-image-inside-of-the-div-nam/42764518
document.querySelector("ul").addEventListener("click", delegation);
function delegation(e) {
  if (e.target && e.target.classList.contains("delete")) {
    removeElement(e);
  }
}
function removeElement(e) {
  const attention = confirm("do y want to delete it?");
  if (attention) {
    e.target.parentElement.remove();
    const todo = {
      titre: e.target.previousSibling.previousSibling.textContent,
      check: e.target.nextSibling.id,
    };
    todoList = todoList.filter((item) => item.titre !== todo.titre);
    console.log(todo);
    console.log(todoList);
    localStorage.setItem("myList", JSON.stringify(todoList));
  }
}
