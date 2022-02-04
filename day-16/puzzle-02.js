const fs = require("fs");
const filename = "day-16/input.txt";
const inputList = fs.readFileSync(filename, "utf8").trim();

const map = new Map();

map.set("0", "0000");
map.set("1", "0001");
map.set("2", "0010");
map.set("3", "0011");
map.set("4", "0100");
map.set("5", "0101");
map.set("6", "0110");
map.set("7", "0111");
map.set("8", "1000");
map.set("9", "1001");
map.set("A", "1010");
map.set("B", "1011");
map.set("C", "1100");
map.set("D", "1101");
map.set("E", "1110");
map.set("F", "1111");

function calc(type, packetValues) {
  switch (type) {
    case 0:
      return packetValues.reduce((acc, cur) => acc + cur);
    case 1:
      return packetValues.reduce((acc, cur) => acc * cur);
    case 2:
      return Math.min(...packetValues);
    case 3:
      return Math.max(...packetValues);
    case 5:
      return packetValues[0] > packetValues[1] ? 1 : 0;
    case 6:
      return packetValues[0] < packetValues[1] ? 1 : 0;
    case 7:
      return packetValues[0] === packetValues[1] ? 1 : 0;
    default:
      return packetValues;
  }
}

function getVersion(bin, totalSubPackets = -1) {
  bin = bin.split("");

  const valueList = [];
  let subPackets = 0;

  while (
    bin.length &&
    ((totalSubPackets < 0 && bin.some((x) => x === "1")) ||
      subPackets < totalSubPackets)
  ) {
    subPackets++;
    const version = parseInt(bin.splice(0, 3).join(""), 2);
    const packetType = parseInt(bin.splice(0, 3).join(""), 2);

    if (packetType === 4) {
      let isLastGroup = false;
      let value = "";

      while (!isLastGroup) {
        isLastGroup = bin.splice(0, 1).join("") === "0";
        value += bin.splice(0, 4).join("");
      }
      valueList.push(parseInt(value, 2));
    } else {
      // operator
      const lengthTypeId = bin.splice(0, 1).join("");

      if (lengthTypeId === "0") {
        const bits = parseInt(bin.splice(0, 15).join(""), 2);
        const subBin = bin.splice(0, bits).join("");
        const [value, remainBin] = getVersion(subBin);
        valueList.push(calc(packetType, Array.from(value)));
      } else {
        const numOfSubPackets = parseInt(bin.splice(0, 11).join(""), 2);
        const subBin = bin.splice(0, bin.length).join("");
        const [value, remainBin] = getVersion(subBin, numOfSubPackets);
        valueList.push(calc(packetType, Array.from(value)));
        bin = remainBin;
      }
    }
  }

  return [valueList, bin];
}

// to binary
let binary = "";
for (const iterator of inputList.split("")) {
  binary += map.get(iterator);
}

console.log(getVersion(binary));
