// localStorage
// На экране поле для ввода текста и кнопка “Добавить”. При нажатии на кнопку текст из
// поля для ввода добавляется как ряд в список снизу.
// Каждый ряд в списке содержит введенный текст и кнопку “Удалить”. При нажатии на
// кнопку текущий ряд удаляется из списка.
// Любое действие должно синхронизироваться с localStorage. При обновлении страницы
// всегда должно отображаться последнее состояние (все элементы) списка.
// В storage нужно записывать только данные, а не DOM элементы

"use strict";
const storage = {
  saveToLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  },
  getFromLocalStorage(key) {
    return localStorage.getItem(key);
  },
};

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
  const data = storage.getFromLocalStorage("data");
  let listArr;
  try {
    listArr = JSON.parse(data);
  } catch (error) {
    console.error("JSON Parse Error", error);
  }

  const ul = document.querySelector("ul");

  for (let i = 0; i < listArr.length; i++) {
    liCreator(ul, listArr[i]);
  }
  let oldSpan;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = event.target.elements.input.value;
    if (!value) {
      if (oldSpan) {
        oldSpan.remove();
      }
      oldSpan = document.createElement("span");
      oldSpan.textContent = "Вы ничего не ввели";
      document.body.insertBefore(oldSpan, ul);
    } else {
      oldSpan = document.querySelector("span");

      if (oldSpan) {
        oldSpan.remove();
      }
      liCreator(ul, value);

      let myArray;
      try {
        myArray = JSON.parse(localStorage.getItem("data"));
      } catch (error) {
        console.error("JSON parse error", error);
      }
      myArray.push(value);
      storage.saveToLocalStorage("data", JSON.stringify(myArray));
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
      let myArray;
      try {
        myArray = JSON.parse(storage.getFromLocalStorage("data"));
      } catch (error) {
        console.error("JSON parse error", error);
      }
      myArray.pop(value);
      storage.saveToLocalStorage("data", JSON.stringify(myArray));
    });
  });
}

function liCreator(parent, textContent) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  li.textContent = textContent;
  button.textContent = "Delete";
  parent.appendChild(li);
  li.appendChild(button);
  return li;
}

const form = createForm();
const list = listCreator(form);
deleteListElements(list);
