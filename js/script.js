// localStorage
// На экране поле для ввода текста и кнопка “Добавить”. При нажатии на кнопку текст из
// поля для ввода добавляется как ряд в список снизу.
// Каждый ряд в списке содержит введенный текст и кнопку “Удалить”. При нажатии на
// кнопку текущий ряд удаляется из списка.
// Любое действие должно синхронизироваться с localStorage. При обновлении страницы
// всегда должно отображаться последнее состояние (все элементы) списка.
// В storage нужно записывать только данные, а не DOM элементы

"use strict";

function createForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("input");
  const ul = document.createElement("ul");

  input.setAttribute("type", "text");
  input.setAttribute("name", "input");
  button.setAttribute("type", "submit");
  button.setAttribute("value", "Добавить");
  ul.textContent = "List";
  document.body.appendChild(form);
  document.body.appendChild(ul);
  form.appendChild(input);
  form.appendChild(button);
  return form;
}

function listCreator(form) {
  const data = localStorage.getItem("data");
  const listArr = JSON.parse(data);
  console.log(listArr);

  const ul = document.querySelector("ul");

  for (let i = 0; i < listArr.length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.textContent = listArr[i];
    button.textContent = "Delete";
    ul.appendChild(li);
    li.appendChild(button);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = event.target.elements.input.value;
    if (!value) {
      const oldSpan = document.querySelector("span");
      if (oldSpan) {
        oldSpan.remove();
      }

      const span = document.createElement("span");
      span.textContent = "Вы ничего не ввели";
      document.body.insertBefore(span, ul);
    } else {
      const oldSpan = document.querySelector("span");

      if (oldSpan) {
        oldSpan.remove();
      }

      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = "Delete";
      li.textContent = value;

      ul.appendChild(li);
      li.appendChild(button);
      let myArray = JSON.parse(localStorage.getItem("data"));
      myArray.push(value);
      localStorage.setItem("data", JSON.stringify(myArray));
      deleteListElements(list);
    }
  });
  return ul;
}
function deleteListElements(ul) {
  const buttons = ul.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.parentNode.textContent;
      const listItem = button.parentNode;
      listItem.remove();
      let myArray = JSON.parse(localStorage.getItem("data"));
      myArray.pop(value);
      localStorage.setItem("data", JSON.stringify(myArray));
    });
  });
}

const form = createForm();
const list = listCreator(form);
deleteListElements(list);
