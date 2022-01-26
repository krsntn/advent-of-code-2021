const fs = require("fs");
const filename = "day-14/input.txt";
const inputList = fs.readFileSync(filename, "utf8").split("\n");

let template = inputList.shift();

const insertion = inputList
  .filter((x) => x.length > 0)
  .map((x) => x.split(" -> "));

const obj = {};

function addToObj(value) {
  const found = Object.keys(obj).find((x) => x === value);
  if (found) {
    obj[found[0]] = obj[found[0]] + 1;
  } else {
    obj[value] = 1;
  }
}

for (let step = 0; step < 10; step++) {
  if (step === 0) {
    for (const iterator of template) {
      addToObj(iterator);
    }
  }

  let i = 1;

  while (i <= template.length) {
    const char1 = template[i - 1];
    const char2 = template[i];

    const insert = insertion.find((x) => x[0] === `${char1}${char2}`);

    if (insert) {
      template = `${template.substring(0, i)}${insert[1]}${template.substring(
        i,
        template.length
      )}`;
      addToObj(insert[1]);
      i++;
    }

    i++;
  }
}

const smallest = Math.min(...Object.values(obj));
const largest = Math.max(...Object.values(obj));

console.log(Number(largest) - Number(smallest));
