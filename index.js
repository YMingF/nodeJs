const db = require("./db.js");
const inquirer = require("inquirer");
module.exports = { add, clear, showAll };

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

async function clear() {
  await db.clear();
}

function updateTitle(list, index) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "新的标题",
      default: list[index].title,
    })
    .then((newTitle) => {
      list[index].title = newTitle.title;
      db.write(list);
    });
}

function markAsDone(list, index) {
  list[index].done = true;
  db.write(list);
}

function markAsUnDone(list, index) {
  list[index].done = false;
  db.write(list);
}

function remove(list, index) {
  list.splice(index, 1);
  db.write(list);
}

function askForAction(list, index) {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "请选择操作",
      choices: [
        { name: "退出", value: "quit" },
        { name: "已完成", value: "markAsDone" },
        { name: "未完成", value: "markAsUnDone" },
        { name: "改标题", value: "updateTitle" },
        { name: "删除", value: "remove" },
      ],
    })
    .then(({ action }) => {
      const actions = {
        markAsDone,
        markAsUnDone,
        updateTitle,
        remove,
      };
      actions[action]?.call(this,list,index);
    });
}

function printTasks(list) {
  // 打印之前任务
  list.forEach((item, index) => {
    console.log(`${item.done ? "[x]" : "[_]"}${index + 1} ${item.title}`);
  });
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择你想操作的任务",
      choices: [
        { name: "退出", value: "-1" },
        ...list.map((item, index) => {
          return {
            name: `${item.done ? "[x]" : "[_]"}${index + 1} ${item.title}`,
            value: index.toString(),
          };
        }),
        { name: "创建新任务", value: "-2" },
      ],
    })
    .then(({ index }) => {
      index = parseInt(index);
      if (index >= 0) {
        // 选中一个任务
        askForAction(list, index);
      } else if (index === -2) {
        createTask(list);
      }
    });
}

// 创建任务
function createTask(list) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "输入任务标题",
    })
    .then((answer) => {
      list.push({ title: answer.title, done: false });
      db.write(list);
    });
}

async function showAll() {
  // 读取所有任务
  const list = await db.read();
  printTasks(list);
}
