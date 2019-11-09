# graphql-twitter-api

This is a simple example of using GraphQL to get Twitter User and User details by providing Twitter `screen_name`.

### How to start the application

1. Go to `https://developer.twitter.com/en/docs` and create an account if you don't have one.
2. Go to `My Applications` and create new Application.
3. Fill in Application details.
4. Go to `Keys and tokens` tab. (There you will find application keys and tokens)
5. Create `.env` file in the root of project directory and populate the values like in example below:

```
PORT=<port>
CONSUMER_KEY=<consumer_key>
CONSUMER_SECRET=<consumer_secret>
ACCESS_TOKEN=<access_token>
ACCESS_TOKEN_SECRET=<access_token_secret>
```

6. Run `npm start`.

### Query example

```
{
  twitter_user(screen_name: "Nemanjas_Vasic") {
    name
    screen_name
    description
    followers_count
    friends_count
    friends {
      screen_name
    }
    followers {
      screen_name
    }
    tweets {
      created_at
      text
      retweets_count
      likes
    }
  }
}
```

### Output example

```
{
  "data": {
    "twitter_user": {
      "name": "Nemanjas",
      "screen_name": "Nemanjas_Vasic",
      "description": "Software developer @ codecentric\n| labs-01 team",
      "followers_count": 25,
      "friends_count": 33,
      "friends": [
        {
          "screen_name": "djovic82"
        },
        {
          "screen_name": "silveira_bells"
        },
        {
          "screen_name": "kll"
        },
        ...
      ],
      "followers": [
        {
          "screen_name": "djovic82"
        },
        {
          "screen_name": "kll"
        },
        {
          "screen_name": "marmureanuweb"
        },
        ...
      ],
      "tweets": [
        {
          "created_at": "Sun Nov 03 19:11:35 +0000 2019",
          "text": "If you want to try GrahpQL and how it works with a real database and not with mock and hardcoded data but you don't… https://t.co/p1wBAaKOKA",
          "retweets_count": 0,
          "likes": 8
        },
        {
          "created_at": "Sat Oct 05 13:14:36 +0000 2019",
          "text": "I just published Handle authentication using Passport.js in NODEJS https://t.co/iuC7HOWg3l",
          "retweets_count": 0,
          "likes": 5
        }
      ]
    }
  }
}
```
