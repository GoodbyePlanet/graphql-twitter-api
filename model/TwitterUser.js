const twit = require("../config/twit");

const getTwitterUser = screen_name => {
  return twit
    .get("users/lookup", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(({ data }) => ({
      name: data[0].name,
      screen_name: data[0].screen_name,
      description: data[0].description,
      followers_count: data[0].followers_count
    }));
};

const getTwitterUserFriends = screen_name => {
  return twit
    .get("friends/list", { screen_name: screen_name })
    .catch(err => console.log("error", err))
    .then(({ data: { users } }) => ({ followers: users }));
};

module.exports = {
  getTwitterUser,
  getTwitterUserFriends
};
