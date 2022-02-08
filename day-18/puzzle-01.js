const fs = require("fs");
const filename = "day-18/input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim().split("\n");

function explode(value) {
  let depth = 0;
  for (let i = 0; i < value.length; i++) {
    const character = value[i];
    if (character === "[") {
      depth++;
    } else if (character === "]") {
      depth--;
    }

    if (depth === 5) {
      let closingBracketPos = i + 1;
      while (value[closingBracketPos] !== "]") {
        closingBracketPos++;
      }
      let candidate = value.substring(i, closingBracketPos + 1);
      candidate = candidate.replace(/[\[\]]/g, "");
      candidate = candidate.split(",").map(Number);

      let leftOriVal = null;
      let rightOriVal = null;
      let leftVal = null;
      let rightVal = null;

      // find & add to left side
      let leftPosEnd = i - 1;
      while (leftPosEnd >= 0 && isNaN(Number(value[leftPosEnd]))) {
        leftPosEnd--;
      }

      if (leftPosEnd >= 0) {
        let leftPosStart = leftPosEnd;
        while (
          leftPosStart - 1 >= 0 &&
          !isNaN(Number(value[leftPosStart - 1]))
        ) {
          leftPosStart--;
        }

        leftOriVal = Number(value.slice(leftPosStart, leftPosEnd + 1));
        leftVal = leftOriVal + candidate[0];

        value =
          value.slice(0, leftPosStart) +
          leftVal.toString() +
          value.slice(leftPosEnd + 1);
      }

      // find & add to right side
      let rightPosStart = closingBracketPos + 1;
      while (
        rightPosStart <= value.length - 1 &&
        isNaN(Number(value[rightPosStart]))
      ) {
        rightPosStart++;
      }

      if (rightPosStart <= value.length - 1) {
        let rightPosEnd = rightPosStart;
        while (
          rightPosEnd + 1 <= value.length - 1 &&
          !isNaN(Number(value[rightPosEnd + 1]))
        ) {
          rightPosEnd++;
        }

        rightOriVal = Number(value.substring(rightPosStart, rightPosEnd + 1));
        rightVal = rightOriVal + candidate[1];

        value =
          value.slice(0, rightPosStart) +
          rightVal.toString() +
          value.slice(rightPosEnd + 1);
      }

      // replace candidate to 0
      value =
        value.slice(
          0,
          i +
            (leftVal
              ? leftVal.toString().length - leftOriVal.toString().length
              : 0)
        ) +
        "0" +
        value.slice(
          closingBracketPos +
            1 +
            (leftVal
              ? leftVal.toString().length - leftOriVal.toString().length
              : 0)
        );

      break;
    }
  }

  return value;
}

function split(value) {
  for (let i = 1; i <= value.length; i++) {
    const character = value[i];
    if (!isNaN(Number(character)) && !isNaN(Number(value[i - 1]))) {
      const num = Number(value[i - 1] + character);
      const firstNum = Math.floor(num / 2);
      const secondNum = Math.ceil(num / 2);

      value =
        value.slice(0, i - 1) +
        `[${firstNum.toString()},${secondNum.toString()}]` +
        value.slice(i + 1);

      break;
    }
  }
  return value;
}

function magnitude(value) {
  while (value.indexOf("]") >= 0) {
    const cloIndex = value.indexOf("]");

    for (let i = value.indexOf("]"); i >= 0; i--) {
      const character = value[i];
      if (character === "[") {
        let candidate = value.slice(i, cloIndex + 1);
        candidate = candidate.replace(/[\[\]]/g, "");
        candidate = candidate.split(",").map(Number);
        value =
          value.slice(0, i) +
          (candidate[0] * 3 + candidate[1] * 2) +
          value.slice(cloIndex + 1);
        break;
      }
    }
  }

  return value;
}

function reduce(value) {
  let afterVal = explode(value);

  while (value !== afterVal) {
    value = afterVal;
    afterVal = explode(afterVal);

    if (value === afterVal) {
      afterVal = split(afterVal);
    }
  }

  return value;
}

let value = "";
for (let i = 0; i < inputList.length; i++) {
  const line = inputList[i];
  value = value ? `[${value},${line}]` : line;

  value = reduce(value);
}

console.log(magnitude(value));
