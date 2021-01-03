const exec = require("child_process").exec;
const fs = require("fs");
const crypto = require("crypto");

const configPath = "/storage";

const validate = (code) => {
  let isValid = true;
  return isValid;
};

const runCode = () => {
  if (validate(code)) {
  } else {
    func({ ERROR: "Invalid code" });
  }
};
const execute = function (code, input, timeOut, func) {};

module.exports = execute;
