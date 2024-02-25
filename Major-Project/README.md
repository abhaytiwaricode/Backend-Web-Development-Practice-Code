# Wanderlust Web Application

Wanderlust is a web application built on the (MongoDB, Express.js, Node.js, EJS templates) that allows users to explore and book vacation rentals.

## Installation

- Clone the repository:
  ```sh
  git clone https://github.com/your-username/your-repository.git
  ```
- Navigate to the project directory:

  ```sh
  cd your-repository

  ```

- Install dependencies using npm:

  ```sh
  npm install

  ```

- Set up the MongoDB connection by updating the MONGO_URL variable in app.js with your MongoDB connection string.

- Start the development server:

  ```sh
  npm start

  ```

- **Access the application at [http://localhost:8080/](http://localhost:8080/).**

## Technologies Used

**Frontend:** HTML, CSS, JavaScript, EJS templates, Bootstrap

**Backend:** Node.js, Express.js, MongoDB

**Dependencies:** mongoose, path, method-override, ejs-mate, express-session, connect-flash, Joi.

## Features

- View all listings
- View listing details
- Add new listings
- Edit existing listings
- Delete listings
- Add reviews to listings
- Flash messages for success and error notifications

## File Structure

- **app.js:** Main application file containing server setup and routes
- **utils/ExpressError.js:** Utility class for custom error handling
- **routes/listing.js:** Route file for handling listing-related routes
- **routes/review.js:** Route file for handling review-related routes
- **views/:** Directory containing EJS templates for rendering views
- **public/:** Directory containing static assets like CSS and client-side JavaScript
- **schema.js:** File containing Joi schemas for validating listing and review data

## Routes

### Listing Route (routes/listing.js)

- **Index Route:** GET /listings/
- **New Route:** GET /listings/new
- **Show Route:** GET /listings/:id
- **Create Route:** POST /listings/
- **Edit Route:** GET /listings/:id/edit
- **Update Route:** PUT /listings/:id
- **Delete Route:** DELETE /listings/:id

### Review Route (routes/review.js)

- **Create Review Route:** POST /listings/:id/reviews/
- **Delete Review Route:** DELETE /listings/:id/reviews/:reviewId

## Middlewares

- **validateListing:** Middleware to validate listing data using Joi schema
- **validateReview:** Middleware to validate review data using Joi schema
- **wrapAsync:** Utility function to handle asynchronous functions in routes

## Error Handling

- Custom `ExpressError` class is used for error handling
- Flash messages are used for notifying users about success and error messages

## Dependencies

- **mongoose:** MongoDB object modeling tool
- **wrapAsync:** Utility function to handle asynchronous functions in routes
- **ExpressError:** Custom error handling utility
- **Joi:** Schema validation library for validating listing and review data

## Contributing

If you'd like to contribute to Wanderlust, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a new Pull Request
