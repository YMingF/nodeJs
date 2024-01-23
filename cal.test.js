jest.mock("fs");
const fs = require("fs");
const db = require("./db.js");

describe("db", () => {
  it("should read", async () => {
    const data = "gaga";
    fs.setMock("/xx", null, data);
    const list = await db.read("/xx");
    expect(list).toEqual(data);
  });
});
