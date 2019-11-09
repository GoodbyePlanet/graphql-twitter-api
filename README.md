# graphql-twitter-api

This is a simple example of using GraphQL to list Twitter User by providing User `screen_name`

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
  twitter_user(screen_name: "Ognjetina") {
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
