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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const getElement = getFormElement(e);

  const data = {
    image: getElement("image").value,
    brandModel: getElement("brand").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => ({ error: true, message: error.message }));

  if (result.error) {
    console.log("erro no cadastro", result.message);
    return;
  }
  const noData = document.querySelector('[data-js="no-content"]');
  if (noData) {
    table.removeChild(noData);
  }
  createTableRow(data);

  e.target.reset();
  image.focus();
});

function createTableRow(data) {
  const tr = document.createElement("tr");
  tr.dataset.plate = data.plate;

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

  const button = document.createElement("button");
  button.textContent = "Exluir";
  button.dataset.plate = data.plate;
  button.addEventListener("click", handleDelete);
  tr.appendChild(button);

  table.appendChild(tr);
}

async function handleDelete(e) {
  const plate = e.target.dataset.plate;
  const tr = document.querySelector(`tr[data-plate="${plate}"]`);
  table.removeChild(tr);
  e.target.removeEventListener("click", handleDelete);

  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ plate }),
  })
    .then((res) => res.json())
    .catch((error) => ({ error: true, message: error.message }));

  if (result.error) {
    console.log("erro ao deletar", result.message);
    return;
  }
  const trs = table.querySelector("tr");
  console.log(trs);
  if (trs === null) {
    createNoCars();
  } else {
    return;
  }
}

function createNoCars() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const ths = document.querySelectorAll("th").length;
  td.setAttribute("colspan", ths);
  td.textContent = "Nenhum carro encontrado";
  tr.dataset.js = "no-data";
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
