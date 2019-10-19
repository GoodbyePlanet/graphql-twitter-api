const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const {
  PORT,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET
} = require("./config");

const Twit = require("twit");

const twit = new Twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});

twit.get(
  "users/lookup",
  { screen_name: "Nemanjas_Vasic" },
  (err, data, response) => {
    console.log(data);
    // console.log("Number of followers", data.ids.length);
  }
);

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT || 4001, () => {
  console.log("Server running on PORT", PORT);
});
