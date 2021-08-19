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
