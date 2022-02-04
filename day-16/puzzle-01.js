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

function getVersion(bin, totalSubPackets = -1) {
  bin = bin.split("");

  const versionList = [];
  let subPackets = 0;

  while (
    bin.length &&
    ((totalSubPackets < 0 && bin.some((x) => x === "1")) ||
      subPackets < totalSubPackets)
  ) {
    subPackets++;
    const version = parseInt(bin.splice(0, 3).join(""), 2);
    const packetType = parseInt(bin.splice(0, 3).join(""), 2);

    versionList.push(version);

    if (packetType === 4) {
      let isLastGroup = false;
      let value = "";

      while (!isLastGroup) {
        isLastGroup = bin.splice(0, 1).join("") === "0";
        value += bin.splice(0, 4).join("");
      }
    } else {
      // operator
      const lengthTypeId = bin.splice(0, 1).join("");

      if (lengthTypeId === "0") {
        console.log("before", bin);

        const bits = parseInt(bin.splice(0, 15).join(""), 2);
        const subBin = bin.splice(0, bits).join("");
        const [totalVersion, remainBin] = getVersion(subBin);
        versionList.push(totalVersion);
        console.log("bin", bin);
      } else {
        const numOfSubPackets = parseInt(bin.splice(0, 11).join(""), 2);
        const subBin = bin.splice(0, bin.length).join("");
        const [totalVersion, remainBin] = getVersion(subBin, numOfSubPackets);
        versionList.push(totalVersion);
        if (remainBin.length) bin = remainBin;
      }
    }
  }

  return [versionList.reduce((previous, current) => previous + current), bin];
}

// to binary
let binary = "";
for (const iterator of inputList.split("")) {
  binary += map.get(iterator);
}

console.log(getVersion(binary));
