const fs = require('fs');
const filename = 'day-10/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

const openRules = ['(', '[', '{', '<'];
const closeRules = [')', ']', '}', '>'];
const output = [];

inputList.forEach((line) => {
  const store = [];
  for (const [index, x] of line.split('').entries()) {
    if (openRules.includes(x)) {
      store.push(x);
    } else {
      const ruleIndex = closeRules.indexOf(x);
      const openSym = openRules[ruleIndex];

      if (openSym === store[store.length - 1]) {
        store.pop();
      } else {
        break;
      }
    }

    if (index === line.split('').length - 1) {
      let totalPoint = 0;
      while (store.length) {
        const value = store.pop();
        let point = 0;

        switch (value) {
          case '(':
            point = 1;
            break;
          case '[':
            point = 2;
            break;
          case '{':
            point = 3;
            break;
          case '<':
            point = 4;
            break;
          default:
            break;
        }

        totalPoint = totalPoint * 5 + point;
      }

      output.push(totalPoint);
    }
  }
});

console.log(output.sort((a, b) => a - b)[Math.floor(output.length / 2)]);
