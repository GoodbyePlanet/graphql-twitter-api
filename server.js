const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");
const { maskErrors } = require("graphql-errors");
const { PORT } = require("./config");

const { getMostLikedTweet } = require("./model/TwitterUser");

const app = express();

getMostLikedTweet("Nemanjas_Vasic");

maskErrors(schema);

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
