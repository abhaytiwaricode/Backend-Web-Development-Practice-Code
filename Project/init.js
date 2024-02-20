const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
  .then((res) => {
    console.log('connection successful!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
  {
    from: 'sandeep',
    to: 'abhay',
    message: 'teach me JS Callbacks',
    created_at: new Date(),
  },
  {
    from: 'abhay',
    to: 'sandeep',
    message: 'I am sending you JS Callbacks notes',
    created_at: new Date(),
  },
  {
    from: 'yash',
    to: 'sandeep',
    message: 'send me your last semester exam paper',
    created_at: new Date(),
  },
  {
    from: 'umesh',
    to: 'abhay',
    message: 'Mera laptop aa gya',
    created_at: new Date(),
  },
  {
    from: 'yash',
    to: 'abhay',
    message: 'aao kaha ho!',
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
