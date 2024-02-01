const express = require('express');
const app = express();

// console.dir(app);
const port = 3000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, I am root path");
});

app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  res.send(`welcome to the page of @${username}.`);
});

app.get("/search", (req, res) => {
  let { q } = req.query;
  res.send(`search results for query: ${q}.`); 
});


// app.get("/apple", (req, res) => {
//   res.send({
//         name: "apple",
//         color: "red",
//       });
// });

// app.get("/banana", (req, res) => {
//   res.send({
//         name: "banana",
//         color: "yellow",
//       });
// });

// app.get("*", (req, res) => {
//   res.send("hmmpe to hai hi naa..");
// });

// app.post("/", (req, res) => {
//   res.send("you sent a post request to root");
// });

// app.use((req, res) => {
//   console.log("request recived");
//   res.send({
//     name: "apple",
//     color: "red",
//   });
// });