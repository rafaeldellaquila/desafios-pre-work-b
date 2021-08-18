import "./style.css";

function displayApp() {
  const link = document.querySelector(".link");
  const div = document.querySelector('[data-js="app"]');

  div.innerHTML = `
    <h1>B. Academy</h1>
    <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
  `;

  link.addEventListener("click", (e) => {
    e.preventDefault();
    div.classList.toggle("active");
  });
}
displayApp();
