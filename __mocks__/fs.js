const fs = jest.genMockFromModule("fs");
const _fs = jest.requireActual("fs"); // 获取真正的fs模块
Object.assign(fs, _fs);
const mocks = {};

// setMock相当于用来设置当你访问某个文件时，所对应的error和data分别是什么？
fs.setMock = (path, error, data) => {
  mocks[path] = [error, data]; //e.g. {'xx':['errorMsg','trueData info']}
};
fs.readFile = (path, options, callback) => {
  if (callback === undefined) {
    callback = options;
  }
  if (path in mocks) {
    // readFile所接收的参数中，callback接收两个参数，分别是err和data。这也就是下面这样写的原因
    callback(...mocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};
module.exports = fs;
