const john = {
  name: "John",
  surname: "Doe",
  age: 30,
  hobbies: ["Surf", "Design"],
};

const jane = {
  ...john,
  name: "Jane",
  hobbies: [...john.hobbies, "MuayThai", "Programming"],
};

console.log("John:", john);
console.log("Jane:", jane);


//Outra Solução possivel
function Person(name, surname, age, hobbies) {
  this.name = name,
    this.surname = surname,
    this.age = age,
    this.hobbies = hobbies;
}

const pedro = new Person('Pedro', 'De Lara', 30, ["Surf", "Design","MuayThai", "Programming"]);

console.log(pedro);
