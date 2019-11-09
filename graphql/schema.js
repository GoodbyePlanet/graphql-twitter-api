const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require("graphql");

const {
  getUser,
  getUserFriends,
  getUserFollowers,
  getUserTweets
} = require("../model/TwitterUser");

const TwitterUser = new GraphQLObjectType({
  name: "TwitterUser",
  fields: () => ({
    name: { type: GraphQLString },
    screen_name: { type: GraphQLString },
    description: { type: GraphQLString },
    followers_count: { type: GraphQLInt },
    friends_count: { type: GraphQLInt },
    tweets: {
      type: new GraphQLList(Tweet),
      resolve(root) {
        return getUserTweets(root.screen_name);
      }
    },
    friends: {
      type: new GraphQLList(TwitterUser),
      resolve(root) {
        return getUserFriends(root.screen_name).then(data => data.friends);
      }
    },
    followers: {
      type: new GraphQLList(TwitterUser),
      resolve(root) {
        return getUserFollowers(root.screen_name).then(data => data.followers);
      }
    }
  })
});

const Tweet = new GraphQLObjectType({
  name: "Tweet",
  fields: () => ({
    created_at: { type: GraphQLString },
    text: { type: GraphQLString },
    retweets_count: { type: GraphQLInt },
    likes: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    twitter_user: {
      type: TwitterUser,
      args: { screen_name: { type: GraphQLString } },
      resolve(_, args) {
        return getUser(args.screen_name);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
