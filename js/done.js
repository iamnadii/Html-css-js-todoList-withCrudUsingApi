// With API

let fetchRes = fetch("https://todo-crud-123.herokuapp.com/todos/isCompleted");
// fetchRes is the promise to resolve
// it by using.then() method

fetchRes
  .then((res) => res.json())
  .then((d) => {
    const newTodo = d.data.list.map(
      (todo) =>
        `<div class="todo-item-${
          todo._id
        } listElement d-flex justify-content-between align-items-center" data-id="${
          todo._id
        }">
      <label class="pt-3" for="todo">
      <h2>${todo.title}</h2>
      <p>${todo.subtitle}</p>
      </label>
      <i data-bin-id="${
        todo._id
      }" class="bin fa-solid fa-trash me-4" style="font-size: 1.8rem; cursor:pointer"></i>
      <input id="todo-${todo._id}" hidden ${
          todo.checkBox ? "checked" : ""
        } class="todoInput" type="checkbox" data-check-id="${todo._id}"/>
      <label style="cursor: pointer" for="todo-${
        todo._id
      }" class="check-label"><i class="fa-solid fa-check"></i></label>
      </div>`
    );
    document.getElementById("todoList").innerHTML = newTodo.join("");
    mapClickEventDeleteButton();
    mapChangeEventChangeButton(d);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

function mapChangeEventChangeButton(d) {
  document.querySelectorAll(".todoInput").forEach((todoInput) =>
    todoInput.addEventListener("change", (e) => {
      const checkId = e.target.getAttribute("data-check-id");
      let newcheckData;
      d.data.list.forEach((todo) => {
        return todo._id === checkId ? (newcheckData = { checkBox: false }) : "";
      });
      document.querySelector(`[data-id="${checkId}"]`).remove();
      fetch(`https://todo-crud-123.herokuapp.com/todos/${checkId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newcheckData }),
      })
        .then((res) => {
          console.log(res);
          // location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
}

function mapClickEventDeleteButton() {
  // console.log("in mapclickevent bin");
  document.querySelectorAll(".bin").forEach((bin) => {
    // console.log("in bin onclick");
    bin.addEventListener("click", (e) => {
      const binId = e.target.getAttribute("data-bin-id");
      // console.log(binId);
      document.querySelector(`[data-id="${binId}"]`).remove();
      fetch(`https://todo-crud-123.herokuapp.com/todos/${binId}`, {
        method: "DELETE",
      })
        .then((res) => {
          console.log(res);
          // location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

// With Local Storage

// let todoData = JSON.parse(localStorage.getItem("list"));
// todoData = todoData.filter((todo) => todo.checked === true);
// const newTodo = todoData.map(
//   (todo) =>
//     `<div class="todo-item-${
//       todo.id
//     } listElement d-flex justify-content-between align-items-center" data-id="${
//       todo.id
//     }">
//   <label class="pt-3" for="todo">
//   <h2>${todo.title}</h2>
//   <p>${todo.subtitle}</p>
//   </label>
//   <i data-bin-id="${
//     todo.id
//   }" class="bin fa-solid fa-trash me-4" style="font-size: 1.8rem; cursor:pointer"></i>
//   <input id="todo-${todo.id}" hidden ${
//       todo.checked ? "checked" : ""
//     } class="todoInput" type="checkbox" data-check-id="${todo.id}"/>
//   <label style="cursor: pointer" for="todo-${
//     todo.id
//   }" class="check-label"><i class="fa-solid fa-check"></i></label>
//   </div>`
// );
// document.getElementById("todoList").innerHTML = newTodo.join("");
// // Click Event Performed on Bin
// document.querySelectorAll(".bin").forEach((bin) => {
//   bin.addEventListener("click", (e) => {
//     let confrmDel = prompt("Confirm Delete (yes/no)?");
//     if (confrmDel === "yes") {
//       const binId = e.target.getAttribute("data-bin-id");
//       document.querySelector(`[data-id="${binId}"]`).remove();
//       const todoList = JSON.parse(localStorage.getItem("list"));

//       const newTodoData = todoList.filter((todo) => todo.id !== +binId);
//       if (newTodoData.length === 0) {
//         localStorage.removeItem("list");
//         return 0;
//       }
//       localStorage.setItem("list", JSON.stringify(newTodoData));
//     } else {
//       return;
//     }
//   });
// });

// // Change Event Performed on Change
// document.querySelectorAll(".todoInput").forEach((todoInput) =>
//   todoInput.addEventListener("change", (e) => {
//     const checkId = e.target.getAttribute("data-check-id");
//     const todoList = JSON.parse(localStorage.getItem("list"));
//     const newcheckData = todoList.map((todo) => {
//       return todo.id !== +checkId ? todo : { ...todo, checked: !todo.checked };
//     });
//     document.querySelector(`[data-id="${checkId}"]`).remove();
//     localStorage.setItem("list", JSON.stringify(newcheckData));
//   })
// );
