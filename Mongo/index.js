const mongoose = require('mongoose');

main()
  .then((res) => {
    console.log('connection successful!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

User.updateOne({name: 'umesh'}, {age: 18})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// User.findOne({age: {$gt: 18}})
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.insertMany([
//   {
//     name: "rajnish",
//     email: "rajnish@abhaytiwaricode.in",
//     age: 19,
//   },
//   {
//     name: "yash",
//     email: "yash@abhaytiwaricode.in",
//     age: 19,
//   },{
//     name: "umesh",
//     email: "umesh@abhaytiwaricode.in",
//     age: 19,
//   },
// ]).then((res) => {
//   console.log(res);
// });

// const user2 = new User({
//   name: "sandeep",
//   email: "sandeep@abhaytiwaricode.in",
//   age: 19,
// });

// user2.save().then(res => {
//   console.log(res);
// })
// .catch(err => {
//   console.log(err);
// });
