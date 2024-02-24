const express = require('express');
const app = express();
const port = 3000;
const users = require('./routes/user.js');
const posts = require('./routes/post.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser('secretcode'));

// Session middleware setup
const sessionOptions = {
  secret: 'mysupersecretcode',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

// Route to register with query parameter
app.get('/register', (req, res) => {
  let { name = 'anonymous' } = req.query;
  req.session.name = name;
  console.log(req.session.name);
  res.send(name);
  res.redirect('/hello');
});

app.get('/hello', (req, res) => {
  res.send(`Hello, ${req.session.name}`);
});

// Route to count requests using session
app.get('/reqcount', (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`You sent a request ${req.session.count} times`);
});

// Route for testing purposes
app.get('/test', (req, res) => {
  res.send('test successful!');
});

// Route to set a signed cookie
app.get('/getsignedcookie', (req, res) => {
  res.cookie('made-in', 'India', { signed: true });
  res.send('signed cookie sent');
});

// Route to verify signed cookies
app.get('/varify', (req, res) => {
  console.log(req.signedCookies);
  res.send('verified');
});

// Route to greet based on cookie value
app.get('/greet', (req, res) => {
  let { name = 'anonymous' } = req.cookies;
  res.send(`Hi, ${name}`);
});

// Route to set cookies
app.get('/getcookies', (req, res) => {
  res.cookie('greet', 'namaste');
  res.send('sent you some cookies!');
});

// Root route
app.get('/', (req, res) => {
  console.dir(req.cookies);
  res.send('Hi, I am root!');
});

// Using routes from external files
app.use('/users', users);
app.use('/posts', posts);

// Server listening
app.listen(port, () => {
  console.log(`app is listening in port : ${port}`);
});
