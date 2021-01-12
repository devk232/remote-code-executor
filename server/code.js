const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const _ = require("lodash");
const crypto = require("crypto");
const cpp = require("./languages/cpp");
const python = require("./languages/python");
const javascript = require("./languages/javascript");
const extensions = require("./extensions");
const router = express.Router();

const getFileName = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

router.post("/", async (req, res) => {
  const { code, language, stdin, time } = req.body;
  const fileName = getFileName(5);
  const sourceCodeFile = fileName;
  const inputFile = fileName + ".txt";
  fs.writeFile(inputFile, stdin, (err) => {
    if (err) {
      res.send(err);
    }
    fs.writeFile(sourceCodeFile + ".cpp", code, async (err) => {
      if (err) res.send(err);
      if (language === "cpp") {
        try {
          const data = await cpp.execute(sourceCodeFile, inputFile, time);
          res.send(data);
        } catch (error) {
          res.send(error.message);
        }
      } else if (language === "javascript") {
        // write logic
      } else if (language === "python") {
        // write logic
      } else {
        res.send("Select a valid programming language");
      }
      fs.promises.unlink(sourceCodeFile + ".cpp", (err) => {
        if (err) throw err;
      });
      fs.promises.unlink(inputFile, (err) => {
        if(err) throw err;
      })
      fs.promises.unlink(sourceCodeFile, (err) => {
        if(err) throw err;
      });
    });
  });
});

module.exports = router;
