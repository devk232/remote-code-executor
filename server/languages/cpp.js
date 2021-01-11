const exec = require("child_process").exec;
const fs = require("fs");
const crypto = require("crypto");

const validate = (code) => {
  let isValid = true;
  return isValid;
};

const runCode = () => {};

const execute = function (sourceCodeFile, inputFile, timeOut) {
  if (validate(sourceCodeFile)) {
    exec(
      `g++ ${sourceCodeFile}.cpp -o ${sourceCodeFile} && ./${sourceCodeFile} < ${inputFile}`,
      (err, stdout, stderr) => {
        if (err) console.log(err);
        const data = {
          output: stdout,
          stderr: stderr,
        };
        console.log("hi", data);
        return data;
      }
    );
  } else {
    console.log("error");
  }
};

module.exports = { execute: execute };
