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
  getUserTweets,
  getMostLikedTweet
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
      args: { limit: { type: GraphQLInt } },
      resolve(root, args) {
        return getUserTweets(root.screen_name, args.limit);
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

const FavoriteTweet = new GraphQLObjectType({
  name: "FavoriteTweet",
  fields: () => ({
    tweet_text: { type: GraphQLString },
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
    },
    mostLikedTweet: {
      type: FavoriteTweet,
      args: { screen_name: { type: GraphQLString } },
      resolve(_, args) {
        return getMostLikedTweet(args.screen_name);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
