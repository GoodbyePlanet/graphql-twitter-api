const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require("graphql");

const { getTwitterUser } = require("../model/TwitterUser");

const TwitterUserType = new GraphQLObjectType({
  name: "TwitterUser",
  fields: () => ({
    name: { type: GraphQLString },
    screen_name: { type: GraphQLString },
    description: { type: GraphQLString },
    followers_count: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    twitter_user: {
      type: TwitterUserType,
      args: { screen_name: { type: GraphQLString } },
      resolve(_, args) {
        return getTwitterUser(args.screen_name).then(data => data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
