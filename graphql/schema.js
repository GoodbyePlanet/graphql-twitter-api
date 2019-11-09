const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require("graphql");

const {
  getTwitterUser,
  getTwitterUserFriends,
  getTwitterUserFollowers,
  getTwitterUserTweets
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
      resolve(root, args) {
        return getTwitterUserTweets(root.screen_name).then(data => data);
      }
    },
    friends: {
      type: new GraphQLList(TwitterUser),
      resolve(root, args) {
        return getTwitterUserFriends(root.screen_name).then(
          data => data.friends
        );
      }
    },
    followers: {
      type: new GraphQLList(TwitterUser),
      resolve(root, args) {
        return getTwitterUserFollowers(root.screen_name).then(
          data => data.followers
        );
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
        return getTwitterUser(args.screen_name).then(data => data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
