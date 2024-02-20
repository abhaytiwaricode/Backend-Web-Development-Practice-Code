const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');
const ExpressError = require('./ExpressError.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
  .then((res) => {
    console.log('connection successful!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// Index Route
app.get(
  '/chats',
  asyncWrap(async (req, res) => {
    let chats = await Chat.find();
    res.render('index.ejs', { chats });
  })
);

// New Route
app.get('/chats/new', (req, res) => {
  // throw new ExpressError(404, 'Page Not Found');
  res.render('new.ejs');
});

// Create Route
app.post(
  '/chats',
  asyncWrap(async (req, res) => {
    let { from, to, message } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      message: message,
      created_at: new Date(),
    });
    newChat
      .save()
      .then((res) => {
        console.log('chat was saved');
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect('/chats');
  })
);

// NEW - Show Route
app.get(
  '/chats/:id',
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, 'Chat Not Found'));
    }
    res.render('show.ejs', { chat });
  })
);

// Edit Route
app.get(
  '/chats/:id/edit',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });
  })
);

// Update Route
app.put(
  '/chats/:id',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let { message: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { message: newMsg },
      { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect('/chats');
  })
);

// Delete Route
app.delete(
  '/chats/:id',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    res.render('confirmDelete.ejs', { id });
  })
);

// Confirm Delete Route
app.post(
  '/chats/:id/delete',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let confirmDelete = req.body.confirmDelete;

    if (confirmDelete === 'yes') {
      let deletedChat = await Chat.findByIdAndDelete(id);
      console.log(deletedChat);
    }
    res.redirect('/chats');
  })
);

app.get('/', (req, res) => {
  res.redirect('/chats');
});

const handleValidationErr = (err) => {
  console.log('This is a Validation error. Please follow rules');
  console.dir(err.message);
  return err;
};

// Mongoose Error
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'ValidationError') {
    err = handleValidationErr(err);
  }
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = 'Some Error Occurred!' } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log('app is listening');
});
