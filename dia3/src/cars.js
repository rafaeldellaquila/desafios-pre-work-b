const form = document.querySelector("[data-js='cars-form']");
const table = document.querySelector("[data-js='table']");

const inputs = document.querySelectorAll('[data-js="cars-form"]>input');

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

function createImage(value) {
  const img = document.createElement("img");
  img.src = value;
  img.style.width = "100px";
  img.style.height = "100px";
  return img;
}

function createText(value) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

function createColor(value) {
  const div = document.createElement("div");
  div.style.backgroundColor = value;
  div.style.height = "100px";
  div.style.width = "100px";
  return div;
}

function getInputValues(inputs) {
  return Array.from(inputs).map((input) => {
    const imgURL = input.value.startsWith("https://");
    const inputInfo = {
      value: input.value,
      name: input.id,
      type: input.type,
    };

    if (imgURL) {
      return {
        ...inputInfo,
        type: "image",
      };
    }

    return inputInfo;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const content = getInputValues(inputs);
  const tr = document.createElement("tr");

  content.forEach((item) => {
    const td = elementTypes[item.type](item.value);
    tr.appendChild(td);
  });

  table.appendChild(tr);
  e.target.reset();
  inputs[0].focus();
});
