const path = require("path");
jest.mock("fs");
const fs = require("fs");
const db = require("../db.js");
describe("db", () => {
  it("can read", async () => {
    const data = [{ title: "hi", done: false }];
    fs.setMock("/xxx", 'hooly cray', JSON.stringify(data));
    const list = await db.read("/xxx");
    console.log(`list`, list);
    expect(list).toStrictEqual(data); // 空数组是不等于空数组的，若要比较两个对象是否相等，需用toStrictEqual
  });
  it("can write", () => {
    expect(fs.x()).toBe("xxx");
  });
});
