const exec = require("child_process").exec;
const fs = require("fs");
const crypto = require("crypto");

const validate = (code) => {
  let isValid = true;
  return isValid;
};

const execute = function (sourceCodeFile, inputFile, timeOut) {
  return new Promise((resolve, reject) => {
    if (validate(sourceCodeFile)) {
      exec(
        `g++ ${sourceCodeFile}.cpp -o ${sourceCodeFile} && ./${sourceCodeFile} < ${inputFile}`,
        { timeout: timeOut, maxBuffer: 20 * 1024 * 1024 },
        (err, stdout, stderr) => {
          if (err) {
            if (stderr) {
              const error = {
                type: "COMPILATION ERROR",
                details: stderr,
              };
              console.log(error);
              reject(new Error(error));
            } else if (
              err.toString().includes("ERR_CHILD_PROCESS_STDIO_MAXBUFFER")
            ) {
              const error = "MaxBuffer Exceeded";
              console.log(error);
              reject(new Error(error));
            } else if (err.toString().includes("Command failed: ")) {
              const error = "TIME LIMIT EXCEEDED";
              reject(new Error(error));
            } else {
              const error = "Error: Try Again";
              console.log(err.toString());
              reject(new Error(error));
            }
          } else {
            const data = {
              output: stdout,
              stderr: stderr,
            };
            resolve(data);
          }
        }
      );
    } else {
      reject(new Error("Error: Code Validatation Failed.."));
    }
    
  });
};

exports.execute = execute;
