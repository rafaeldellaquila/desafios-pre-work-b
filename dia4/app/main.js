import "./style.css";
const title = document.querySelector("h1");
const tbody = document.querySelector("tbody");
const div = document.createElement("div");

fetch("http://localhost:3333", { method: "GET" })
  .then((result) => result.json())
  .then((result) => (title.textContent = result.message));

fetch("http://localhost:3333/cars", { method: "GET" })
  .then((result) => result.json())
  .then((result) => {
    if (result.length <= 0) {
      div.textContent = "Nenhum carro encontrado";
    }
  });

tbody.appendChild(div);
