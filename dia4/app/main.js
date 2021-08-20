import "./style.css";
const url = "http://localhost:3333/cars";
const form = document.querySelector("[data-js='cars-form']");
const table = document.querySelector("[data-js='table']");

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

function createImage(value) {
  const td = document.createElement("td");
  const img = document.createElement("img");
  img.src = value;
  img.width = 100;
  td.appendChild(img);
  return td;
}

function createText(value) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

function createColor(value) {
  const td = document.createElement("td");
  const div = document.createElement("div");
  td.appendChild(div);
  div.style.background = value;
  div.style.width = "100px";
  div.style.height = "100px";
  return td;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const getElement = getFormElement(e);

  const data = {
    image: getElement("image").value,
    brandModel: getElement("brand").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  createTableRow(data);

  e.target.reset();
  image.focus();
});

function createTableRow(data) {
  const tr = document.createElement("tr");
  const elements = [
    { type: "image", value: data.image },
    { type: "text", value: data.brandModel },
    { type: "text", value: data.year },
    { type: "text", value: data.plate },
    { type: "color", value: data.color },
  ];

  elements.forEach((element) => {
    const td = elementTypes[element.type](element.value);
    tr.appendChild(td);
  });

  table.appendChild(tr);
}

function createNoCars() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const ths = document.querySelectorAll("th").length;
  td.setAttribute("colspan", ths);
  td.textContent = "Nenhum carro encontrado";
  tr.appendChild(td);
  table.appendChild(tr);
}

async function request() {
  const result = await fetch(url)
    .then((res) => res.json())
    .catch((error) => ({ error: true, message: error.message }));

  if (result.error) {
    console.log("Erro ao buscar dados", result.message);
    return;
  }

  if (result.length === 0) {
    createNoCars();
    return;
  }

  result.forEach(createTableRow);
}

request();
