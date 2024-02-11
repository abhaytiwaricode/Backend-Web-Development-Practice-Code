const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Listing = require("./models/listing");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
 await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
  res.redirect("/testListing");
});

app.get('/testListing', async (req, res) => {
  let sampleListing = new Listing({
    title: "My Home",
    description: "By the beach",
    price: 1200,
    location: "Calangute Goa",
    country: "India",
  });
  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
