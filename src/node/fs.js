import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { mkdir, access, constants } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = "./users.json";
const usersFile = path.join(__dirname, file);

function generateUsersList() {
  return Array.from({ length: 100 }).map((_, index) => {
    const randomAge = Math.ceil(Math.random() * 100);
    const timestamp = new Date().getTime();
    return { id: index + 1, name: "Tom", age: randomAge, timestamp };
  });
}

function create() {
  const content = JSON.stringify(generateUsersList(), null, 2);
  writeFileSync(usersFile, content);
}

function read() {
  if (existsSync(usersFile)) {
    const usersInfo = readFileSync(usersFile);
    let record = [];
    try {
      record = JSON.parse(usersInfo);
    } catch (e) {}
    console.log(record);
  }
}

// function main() {
//   create()
//   if (existsSync(usersFile)) {
//     read()
//   } else {
//     create()
//   }
// }

function readListData() {
  const listFile = path.join(__dirname, "./list.json");
  if (existsSync(listFile)) {
    const listStr = readFileSync(listFile);
    let list = [];
    try {
      list = JSON.parse(listStr);
    } catch (e) {}
    const res = [];
    list.forEach((item) => {
      const { tag, tag1, code } = item;
      if (tag || tag1) {
        const tagList =
          tag && tag1 ? [tag, tag1] : (tag && [tag]) || (tag1 && [tag1]);
        res.push({ code, tag: tagList });
      }
    });
    createDir(res);
  }
}

function createDir(data) {
  const dir = new URL("./dist/", import.meta.url);
  access(dir, constants.R_OK | constants.W_OK).then(() => {
    createListData(fileURLToPath(dir), data);
  }).catch(() => {
    mkdir(dir, { recursive: true }).then((res) => {
      createListData(res, data);
    });
  })

}

function createListData(dir, data) {
  const resultFile = path.join(dir, "./result.json");
  const content = JSON.stringify(data, null, 2);
  writeFileSync(resultFile, content);
}

function main() {
  readListData();
}

main();
