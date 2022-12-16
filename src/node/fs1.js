import {
  mkdir,
  access,
  constants,
  writeFile,
  stat,
  rm,
  rmdir,
  opendir,
} from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
  const list = {
    name: "tom",
    age: 20,
  };
  createDir("result", list);
}

function createDir(output, data) {
  // constants.R_OK | constants.W_OK
  const dir = new URL(`./${output}/`, import.meta.url);
  stat(dir)
    .then(() => {
      createData(fileURLToPath(dir), "list.json", data);
    })
    .catch(() => {
      mkdir(dir, { recursive: true }).then((res) => {
        createData(res, "list.json", data);
      });
    });
  // access(dir, constants.X_OK)
  //   .then(() => {
  //     createData(fileURLToPath(dir), "list.json", data);
  //   })
  //   .catch(() => {
  //     mkdir(dir, { recursive: true }).then((res) => {
  //       createData(res, "list.json", data);
  //     });
  //   });
}

function createData(dir, file, data) {
  const filePath = path.join(dir, file);
  console.log("filePath", filePath);
  const content = JSON.stringify(data, null, 2);
  writeFile(filePath, content)
    .then((res) => {
      console.log("writeFile", res);
    })
    .catch((e) => {
      console.log("writeFile error", e);
    });
}

// main();

// https://www.51sjk.com/b151b268543/ 

removeTest();

function onRejected(err) {
  return Promise.reject(err);
}

function removeTest() {
  const dir = new URL(`./result/`, import.meta.url);
  // const filename = path.join(fileURLToPath(dir), "./list.json");
  remove(fileURLToPath(dir))
    .then((res) => {
      console.log("remove", res);
    })
    .catch((e) => {
      console.log("remove error", e);
    });
}

function remove(filename) {
  return stat(filename)
    .then((stats) => {
      if (stats.isDirectory()) {
        return opendir(filename).then((res) => {
          removeContent(res, filename).then(() => {
            res.close();
            return rmdir(filename);
          }, onRejected);
        }, onRejected);
      } else {
        return rm(filename);
      }
    }, onRejected)
    .catch((err) => {
      return Promise.reject(err);
    });
}

function removeContent(dir, parentPath) {
  return dir.read().then((dirent) => {
    if (dirent) {
      remove(path.resolve(parentPath, dirent.name)).then(() => {
        removeContent(dir, parentPath);
      }, onRejected);
    }
  }, onRejected);
}
