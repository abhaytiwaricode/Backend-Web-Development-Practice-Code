const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/listing.js');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('./schema');
const Review = require('./models/review.js');
const listings = require('./routes/listing');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send("Hi, I'm Root...");
});

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(',');
    return next(new ExpressError(400, errMsg));
  }
  next();
};

app.use('/listings', listings);

// Reviews
// POST Review Route

app.post(
  '/listings/:id/reviews',
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete Review Route
app.delete(
  '/listings/:id/reviews/:reviewId',
  wrapAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);

// Error handling middleware
app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found!'));
});

app.use((err, req, res, next) => {
  let { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).render('error.ejs', { message });
});

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
