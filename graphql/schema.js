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
  description:
    "TwitterUser is type that describes User and its fields and fields resolvers",
  fields: () => ({
    name: { type: GraphQLString },
    screen_name: {
      type: GraphQLString,
      description:
        "TwitterUser screen name is present as part of twitter base url (e.g. twitter.com/screen_name)"
    },
    description: { type: GraphQLString },
    followers_count: {
      type: GraphQLInt,
      description: "Number of User followers"
    },
    friends_count: {
      type: GraphQLInt,
      description: "Number of users that TwitterUser follows"
    },
    tweets: {
      type: new GraphQLList(Tweet),
      args: {
        limit: {
          type: GraphQLInt,
          description: "Defines number of tweets to be returned by server"
        }
      },
      resolve(root, { limit }) {
        return getUserTweets(root.screen_name, limit);
      }
    },
    friends: {
      type: new GraphQLList(TwitterUser),
      args: {
        limit: {
          type: GraphQLInt,
          description: "Number of TwitterUser friends to be returned by server"
        }
      },
      resolve(root, { limit }) {
        return getUserFriends(root.screen_name, limit).then(
          data => data.friends
        );
      }
    },
    followers: {
      type: new GraphQLList(TwitterUser),
      args: {
        limit: {
          type: GraphQLInt,
          description:
            "Number of TwitterUser followers to be returned by server"
        }
      },
      resolve(root, { limit }) {
        return getUserFollowers(root.screen_name, limit).then(
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

const FavoriteTweet = new GraphQLObjectType({
  name: "FavoriteTweet",
  fields: () => ({
    tweet_text: { type: GraphQLString },
    likes: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query and its fields",
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
