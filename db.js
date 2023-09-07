const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();
// process.env.HOME用于获取用户自己设置的环境变量
const home = process.env.HOME || homedir;
const dbPath = path.join(home, ".todo1");
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (err, data) => {
        if (err) {
          return reject(err);
        }
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(dbPath, string + "\n", (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
};
module.exports = db; //即db有哪些属性，那就导出哪些属性
