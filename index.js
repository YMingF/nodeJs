const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();
// process.env.HOME用于获取用户自己设置的环境变量
const home = process.env.HOME || homedir;
const dbPath = path.join(home, ".todo1");
const db = require("./db.js");
module.exports = { add, clear };

async function add(title) {
  // 读取之前的任务
  const list = await db.read();
  // 准备数据
  list.push({
    title,
    done: false,
  });
  // 存储任务到文件中
  await db.write(list);

 
}
function clear() {
  fs.writeFile(dbPath, "", (err) => {
    if (err) {
      console.error(err);
    }
  });
}
