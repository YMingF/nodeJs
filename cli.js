const program = require("commander");
const { add, clear } = require("./index.js");
program.option("-x", "--xxx", "test");
program
  .command("add")
  .description("add a item")
  .action((...args) => {
    const words = args.slice(0, -1).join(",");
    add(words);
  });
program
  .command("clear")
  .description("clear items")
  .action((...args) => {
    clear();
  });
program.parse(process.argv);
