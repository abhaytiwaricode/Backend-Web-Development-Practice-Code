const mongoose = require('mongoose');

main()
  .then((res) => {
    console.log('connection successful!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 20,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, 'Price is to low for Amazon selling'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  genere: [String],
});

const Book = mongoose.model('Book', bookSchema);

Book.findByIdAndUpdate('65c5406421b17be18b1c04ca', { price: 699 }, { runValidators: true})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.errors.price.properties.message);
  });

// const book1 = new Book({
//   title: "Marvel Comics v2",
//   price: 699,
//   genere: ['comics', 'superheroes', 'fiction'],
// });

// book1.save().then(res => {
//   console.log(res);
// })
// .catch(err => {
//   console.log(err);
// });
