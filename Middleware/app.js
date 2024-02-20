const express = require('express');
const app = express();
const ExpressError = require('./ExpressError.js');

// app.use((req, res, next) => {
//   console.log('Hi, I am 1st middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Hi, I am 2nd middleware');
//   next();
// });

// // logger - morgan
// app.use((req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.path, req.time, req.hostname);
//   next();
// });

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === 'give-access') {
    next();
  }
  throw new ExpressError(401, 'ACCESS DENIED!');
};

app.get('/api', checkToken, (req, res) => {
  res.send('data');
});

app.get('/err', (req, res) => {
  abcd = abcd;
});

app.get('/admin', (req, res) => {
  throw new ExpressError(403, 'Access to admin is Forbidden');
});

app.get('/', (req, res) => {
  res.send('Hi, I am root...');
});

app.get('/random', (req, res) => {
  res.send('this is a random page');
});

// 404
app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.use((err, req, res, next) => {
  let { status = 500, message = 'Some Error Occurred' } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log('app is listining on port : 8080');
});
