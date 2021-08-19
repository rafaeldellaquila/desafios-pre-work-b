const nameInput = document.querySelector('[data-js="input"]');
const dontUpperCase = ["de", "da", "do", "dos"];

nameInput.addEventListener("input", (e) => {
  const valueArr = e.target.value.split(" ");
  console.log(valueArr);
  e.target.value = valueArr
    .map((name) => {
      return nameCase(name);
    })
    .join(" ");
});

function nameCase(name) {
  if (name.length === 0) {
    return "";
  } else if (dontUpperCase.includes(name.toLowerCase())) {
    return name.toLowerCase();
  } else {
    return `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
  }
}

///////////
const form = document.querySelector('[data-js="form"]');
const select = document.createElement("select");

const colors = {
  amarelo: "#FF3",
  rosa: "#DAF",
  laranja: "#E74",
  azul: "#33D",
  vermelho: "#F03",
};

const container = document.createElement("div");
container.style.display = "flex";

function divColor(color) {
  const div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.background = color;
  return div;
}

for (let key in colors) {
  const selectColor = document.createElement("option");
  selectColor.value = colors[key];
  selectColor.textContent = key;
  select.appendChild(selectColor);
}

select.addEventListener("change", (e) => {
  container.innerHTML = "";
  Array.from(e.target.selectedOptions).forEach((option) => {
    const div = divColor(option.value);
    container.appendChild(div);
  });
});

select.setAttribute("multiple", "");
form.appendChild(select);
document.body.appendChild(container);
