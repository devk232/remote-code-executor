const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const fs = require("fs");
const crypto = require("crypto");
const cpp = require("./languages/cpp");
const python = require("./languages/python");
const javascript = require("./languages/javascript");
const extensions = require("./extensions");
const router = express.Router();

const configPath = "";

const getFileName = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

router.post("/", (req, res) => {
  const { code, language, stdin, time } = req.body;
  const fileName = getFileName(10);
  const sourceCodeFile = configPath + fileName;
  const inputFile = configPath + fileName + ".txt";
  fs.writeFile(inputFile, stdin, (err) => {
    if (err) res.send(err);
    fs.writeFile(sourceCodeFile + ".cpp", code, (err) => {
      if (err) res.send(err);
      else if (language === "cpp") {
        let data = cpp.execute(sourceCodeFile, inputFile, time);
        console.log(data);
        res.send(data);
        // fs.unlink(sourceCodeFile + '.cpp', (err) => {
        //   if(err)console.log(err);
        // })
        // fs.unlink(sourceCodeFile, (err) => {
        //   if (err) console.log(err);
        // });
        // fs.unlink(inputFile, (err) => {
        //   if (err) console.log(err);
        // });
      } else if (language === "javascript") {
        // write logic
      } else if (language === "python") {
        // write logic
      } else {
        res.send("Select a valid programming language");
      }
    });
  });
});

module.exports = router;
