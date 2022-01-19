const fs = require('fs');
const filename = 'day-03/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

let arr = [];

inputList.forEach((value) => {
  value.split('').forEach((x, index) => {
    arr[index] = arr[index] ? (arr[index] += Number(x)) : Number(x);
  });
});

function calc(list, defaultValue) {
  let output = '';
  for (let i = 0; i < list[0].length; i++) {
    let e = list.map((x) => Number(x[i])).reduce((acc, val) => acc + val);
    if (e === list.length / 2) {
      output += defaultValue;
    } else {
      if (defaultValue === 1) {
        output += e > list.length / 2 ? 1 : 0;
      } else {
        output += e < list.length / 2 ? 1 : 0;
      }
    }

    list = list.filter((x) => x.startsWith(output));

    if (list.length === 1) {
      return parseInt(list[0], 2);
    }
  }
}

const commonOxygen = calc(inputList, 1);
const commonCo2 = calc(inputList, 0);

const ans = commonOxygen * commonCo2;

// output answer
console.log(ans);
