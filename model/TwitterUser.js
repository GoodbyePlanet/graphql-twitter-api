const Twit = require("twit");
const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET
} = require("../config");

const twit = new Twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});

const getTwitterUser = screen_name => {
  return twit
    .get("users/lookup", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(result => ({
      name: result.data[0].name,
      screen_name: result.data[0].screen_name,
      description: result.data[0].description,
      followers_count: result.data[0].followers_count
    }));
};

module.exports = {
  getTwitterUser
};
