// You can also use $ npm run start_local and then remove all dotenv
// references in the code. The dotenv package provides an option where
// you can preload the variables outside of your code.
// You can load the variables and eliminate the code that reads the .env file from our code.
// Use — require ( -r ) command line option to preload dotenv.
// The following command will preload all environment variables from the
// file .env using dotenv and make them available in your app.

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  CONSUMER_KEY: process.env.CONSUMER_KEY,
  CONSUMER_SECRET: process.env.CONSUMER_SECRET,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};
