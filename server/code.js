const express = require("express");
const bodyParser = require("body-parser")
const _ = require("lodash");
const fs = require("fs");
const crypto = require("crypto");
const cpp = require("./languages/cpp");
const python = require('./languages/python');
const javascript = require('./languages/javascript');
const extensions = require('./extensions');
const router = express.Router();

const configPath = './bin/';

const getFileName = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

router.post("/", (req, res) => {
  const { code, langugage, stdin, time } = req.body;
  const fileName = getFileName(10);
  const sourceCodeFile = configPath + fileName + '.' + extensions[`${langugage}`];
  const inputFile = configPath + fileName + '.txt'; 
  fs.writeFile(sourceCodeFile, code, (err) => {
    if (err) res.send(err);
    fs.writeFile(inputFile, input, (err) => {
      res.send(err);
      switch (langugage) {
        case 'cpp' : {

            break;
        }
        case 'python' : {
            break;
        }
        case 'javascript' : {
            break;
        }
        default:
          res.send("Please select a valid Programming language");
    }  
    });
  });
  res.send("hello-world");
});

module.exports = router;
