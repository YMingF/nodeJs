#!/usr/bin/env node
// cli就是（command-line interface）命令行界面的缩写.
const program = require("commander");
const { add, clear, showAll } = require("./index.js");
const pkg = require("./package.json");
program.version(pkg.version);
program
  .command("add")
  .description("add a item")
  .action((...args) => {
    const words = args.slice(0, -1).join(",");
    add(words).then(
      () => {
        console.log("添加成功");
      },
      () => {
        console.log("添加失败");
      }
    );
  });
program
  .command("clear")
  .description("clear items")
  .action((...args) => {
    clear().then(
      () => {
        console.log("清除成功");
      },
      () => {
        console.log("清除失败");
      }
    );
  });
// process.argv可用于查看你调用指令时传递了哪些参数
program.parse(process.argv);
if (process.argv.length === 2) {
  showAll();
}
