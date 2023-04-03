// localStorage
// На экране поле для ввода текста и кнопка “Добавить”. При нажатии на кнопку текст из
// поля для ввода добавляется как ряд в список снизу.
// Каждый ряд в списке содержит введенный текст и кнопку “Удалить”. При нажатии на
// кнопку текущий ряд удаляется из списка.
// Любое действие должно синхронизироваться с localStorage. При обновлении страницы
// всегда должно отображаться последнее состояние (все элементы) списка.
// В storage нужно записывать только данные, а не DOM элементы

"use strict";

class Input {
  constructor() {
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.button = document.createElement("input");
    this.ul = document.createElement("ul");
    this.input.setAttribute("type", "text");
    this.button.setAttribute("type", "submit");
    this.button.setAttribute("value", "Добавить");
    this.ul.textContent = "List";
    this.span = document.createElement("span");
    this.storageId = 0;
  }
  render() {
    document.body.appendChild(this.form);
    document.body.appendChild(this.ul);
    this.form.appendChild(this.input);
    this.form.appendChild(this.button);
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const value = this.input.value;
      if (!this.input.value) {
        this.span.remove();
        this.span.textContent = "Вы ничего не ввели";
        document.body.insertBefore(this.span, this.ul);
      } else {
        this.span.remove();
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = "Delete";

        li.textContent = value;
        this.ul.appendChild(li);
        li.appendChild(button);
        this.input.value = "";

        button.addEventListener("click", () => {
          li.remove();
        });

        // localStorage.setItem(this.storageId, value);
        // this.storageId++;
      }
    });
  }
}

const input = new Input();
input.render();

// "use strict";

// class Input {
//   constructor() {
//     this.form = document.createElement("form");
//     this.input = document.createElement("input");
//     this.button = document.createElement("input");
//     this.ul = document.createElement("ul");
//     this.input.setAttribute("type", "text");
//     this.button.setAttribute("type", "submit");
//     this.button.setAttribute("value", "Добавить");
//     this.ul.textContent = "List";
//     this.span = document.createElement("span");
//     this.storageId = 0;
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         const value = localStorage.getItem(key);
//         const li = document.createElement("li");
//         li.textContent = value;
//         this.ul.appendChild(li);
//         this.storageId++;
//       }
//   }
//   render() {
//     document.body.appendChild(this.form);
//     document.body.appendChild(this.ul);
//     this.form.appendChild(this.input);
//     this.form.appendChild(this.button);
//     this.form.addEventListener("submit", (event) => {
//       event.preventDefault();

//       const value = this.input.value;
//       if (!this.input.value) {
//         this.span.remove();
//         this.span.textContent = "Вы ничего не ввели";
//         document.body.insertBefore(this.span, this.ul);
//       } else {
//         this.span.remove();
//         const li = document.createElement("li");
//         li.textContent = value;
//         this.ul.appendChild(li);
//         this.input.value = "";

//         localStorage.setItem(this.storageId, value);
//         this.storageId++;

//       }
//     });
//   }
// }

// const input = new Input();
// input.render();
