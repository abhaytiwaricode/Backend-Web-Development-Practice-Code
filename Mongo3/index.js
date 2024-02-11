const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log('connection successful!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index Route
app.get('/chats', async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", { chats });
});

// New Route
app.get('/chats/new', async (req, res) => {
  res.render("new.ejs");
});

// Create Route

app.get('/', (req, res) => {
  res.send('working root');
});

app.listen(8080, () => {
  console.log('app is listening');
});
