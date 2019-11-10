const twit = require("../config/twit");

const getUser = screen_name => {
  return twit
    .get("users/lookup", { screen_name })
    .then(({ data }) => ({
      name: data[0].name,
      screen_name: data[0].screen_name,
      description: data[0].description,
      followers_count: data[0].followers_count,
      friends_count: data[0].friends_count
    }))
    .catch(err => handleError(err));
};

const getUserFriends = screen_name => {
  return twit
    .get("friends/list", { screen_name })
    .then(({ data: { users: friends } }) => ({ friends }))
    .catch(err => handleError(err));
};

const getUserFollowers = screen_name => {
  return twit
    .get("followers/list", { screen_name })
    .then(({ data: { users: followers } }) => ({ followers }))
    .catch(err => handleError(err));
};

const getUserTweets = screen_name => {
  return twit
    .get("statuses/user_timeline", { screen_name })
    .then(({ data }) => {
      return data.map(tweet => ({
        created_at: tweet.created_at,
        text: tweet.text,
        retweets_count: tweet.retweet_count,
        likes: tweet.favorite_count
      }));
    })
    .catch(err => handleError(err));
};

const handleError = error => {
  console.log("An error occured", error);
  throw new Error("Whooops!", error);
};

module.exports = {
  getUser,
  getUserFriends,
  getUserFollowers,
  getUserTweets
};
