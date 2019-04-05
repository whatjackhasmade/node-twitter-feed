require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const Twitter = require("twitter");

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get("/", (req, res) => {
	client.get("statuses/user_timeline", (error, tweets, response) => {
		if (error) console.error(error);
		res.json(tweets);
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
