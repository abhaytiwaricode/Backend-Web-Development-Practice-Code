const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const listingController = require('../controllers/listings');

const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateReview,
} = require('../middleware');

// Index Route
router.get('/', wrapAsync(listingController.index));

// New Route
router.get('/new', isLoggedIn, wrapAsync(listingController.renderNewForm));

// Show Route
router.get('/:id', wrapAsync(listingController.showListing));

//Create Route
router.post(
  '/',
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);

// Edit Route
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route
router.put(
  '/:id',
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
