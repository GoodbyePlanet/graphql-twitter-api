const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./schema");
const { PORT } = require("./config");

const app = express();

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});
