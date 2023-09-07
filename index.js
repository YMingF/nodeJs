const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();
// process.env.HOME用于获取用户自己设置的环境变量
const home = process.env.HOME || homedir;
const dbPath = path.join(home, ".todo1");
module.exports = { add, clear };
function add(title) {
  const content = fs.readFileSync(dbPath, { flag: "a+" });
  let list;
  try {
    list = JSON.parse(content.toString());
  } catch (error) {
    list = [];
  }
  console.log(list);
  list.push({
    title,
  });
  const string = JSON.stringify(list);
  console.log(`string`, string);
  fs.writeFile(dbPath, string, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
function clear() {
  fs.writeFile(dbPath, "", (err) => {
    if (err) {
      console.error(err);
    }
  });
}
