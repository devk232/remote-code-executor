const express = require("express");
const app = express();

const code = require("./server/code");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3030;
app.get("/", (req, res) => {
  res.send("go to /code");
});

app.use("/code", code);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
