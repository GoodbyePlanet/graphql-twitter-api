const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");
const { PORT } = require("./config");

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
