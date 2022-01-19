const fs = require('fs');
const filename = 'src/day-04/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

const [draw, ...lines] = inputList;

const arr = [];

for (let i = 0, card = [], lineNum = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line) {
    line
      .split(' ')
      .filter((x) => x !== '')
      .forEach((x, index) => {
        const obj = {
          value: Number(x),
          row: lineNum,
          column: index % 5,
          marked: false,
        };
        card.push(obj);
      });

    if (lineNum === 4) {
      arr.push(card);
      card = [];
    }

    lineNum = (lineNum + 1) % 5;
  }
}

const draws = draw.split(',');
const bingoCards = new Set();
let bingoCard = null;
let ans = null;

for (let y = 0; y < draws.length; y++) {
  const drawn = draws[y];

  const number = Number(drawn);

  for (let i = 0; i < arr.length; i++) {
    const card = arr[i];

    // mark drawn number
    const spot = card.find((x) => x.value === number);
    if (spot) {
      spot.marked = true;
    }

    // check bingo
    const markedSpots = card.filter((x) => x.marked);
    for (let index = 0; index < 5; index++) {
      if (
        markedSpots.filter((x) => x.row === index).length >= 5 ||
        markedSpots.filter((x) => x.column === index).length >= 5
      ) {
        bingoCards.add(i);
        break;
      }
    }

    if (bingoCards.size === arr.length) {
      bingoCard = card;
      break;
    }
  }

  if (bingoCards.size === arr.length) {
    ans =
      bingoCard
        .filter((x) => !x.marked)
        .map((x) => x.value)
        .reduce((acc, cur) => acc + cur) * drawn;
    break;
  }
}

// output answer
console.log(ans);
