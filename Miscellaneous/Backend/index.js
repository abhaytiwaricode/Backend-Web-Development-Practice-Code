const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/register", (req, res) => {
  let { username, password } = req.query;
  res.send(`Standard GET Response. Welcome ${username}!`);
});

app.post("/register", (req, res) => {
  let { username, password } = req.body;
  res.send(`Standard POST Response. Welcome ${username}!`);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});