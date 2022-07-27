// With API

document.querySelector("#btn").addEventListener("click", () => {
  // e.preventDefault();
  const title = document.getElementById("todoTitle").value;
  const subtitle = document.getElementById("todoSubTitle").value;
  if (title === "" || subtitle === "") return;
  const obj = { title, subtitle };
  // console.log(obj);
  fetch("https://todo-crud-123.herokuapp.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...obj,
    }),
  })
    .then((res) => {
      console.log(res);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

// With Local Storage

// if (localStorage.getItem("list")) {
//   const arr = JSON.parse(localStorage.getItem("list"));
//   let ID = arr[arr.length - 1].id + 1;
//   arr.push({ id: ID, ...obj, checked: false });
//   localStorage.setItem("list", JSON.stringify(arr));
// } else {
//   localStorage.setItem(
//     "list",
//     JSON.stringify([{ id: 1, ...obj, checked: false }])
//   );
// }

fetch("", { method: "" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
