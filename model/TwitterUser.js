const twit = require("../config/twit");

const getTwitterUser = screen_name => {
  return twit
    .get("users/lookup", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(({ data }) => ({
      name: data[0].name,
      screen_name: data[0].screen_name,
      description: data[0].description,
      followers_count: data[0].followers_count,
      friends_count: data[0].friends_count
    }));
};

const getTwitterUserFriends = screen_name => {
  return twit
    .get("friends/list", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(({ data: { users } }) => ({ friends: users }));
};

const getTwitterUserFollowers = screen_name => {
  return twit
    .get("followers/list", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(({ data: { users } }) => ({ followers: users }));
};

const getTwitterUserTweets = screen_name => {
  return twit
    .get("statuses/user_timeline", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(({ data }) => {
      return data.map(tweet => ({
        created_at: tweet.created_at,
        text: tweet.text,
        retweets_count: tweet.retweets_count,
        likes: tweet.favorite_count
      }));
    });
};

module.exports = {
  getTwitterUser,
  getTwitterUserFriends,
  getTwitterUserFollowers,
  getTwitterUserTweets
};
