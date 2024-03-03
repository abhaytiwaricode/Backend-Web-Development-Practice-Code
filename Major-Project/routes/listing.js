const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const listingController = require('../controllers/listings');
const { isLoggedIn, isOwner, validateListing } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router
  .route('/')
  .get(wrapAsync(listingController.index))
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createListing)
  // );
  .post(upload.single('listing[image]'), (req, res) => {
    res.send(req.file);
  });

// New Route
router.get('/new', isLoggedIn, wrapAsync(listingController.renderNewForm));

router
  .route('/:id')
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
