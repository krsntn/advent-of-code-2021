const fs = require("fs");
const filename = "day-17/input.txt";
const inputList = fs
  .readFileSync(filename, "utf8")
  .replace(/[^0-9. -]/g, "")
  .trim();

const targetRangeX = inputList.split(" ")[0].split("..").map(Number);
const targetRangeY = inputList.split(" ")[1].split("..").map(Number);

const withinTargets = [];

for (let i = -300; i < 300; i++) {
  for (let j = -300; j < 300; j++) {
    let overTarget = false;
    let posX = 0;
    let posY = 0;
    let highestPosY = 0;

    let x = i;
    let y = j;

    while (!overTarget) {
      if (x < 0) {
        x = 0;
      }

      posX += x;
      posY += y;

      if (posY > highestPosY) {
        highestPosY = posY;
      }

      // inside target
      if (
        posX >= targetRangeX[0] &&
        posX <= targetRangeX[1] &&
        posY >= targetRangeY[0] &&
        posY <= targetRangeY[1]
      ) {
        withinTargets.push([i, j, highestPosY]);
        break;
      }

      // over target
      overTarget = posY < targetRangeY[0];
      if (!overTarget && posX > targetRangeX[1]) {
        overTarget = true;
      }

      x--;
      y--;
    }
  }
}

console.log(withinTargets.length);
