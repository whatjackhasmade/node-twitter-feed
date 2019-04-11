require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const Twitter = require("twitter");

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const allowCrossDomain = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, Content-Length, X-Requested-With"
	);
};

app.use(allowCrossDomain);

app.get("/", (req, res) => {
	client.get("statuses/user_timeline", (error, tweets, response) => {
		if (error) console.error(error);
		res.json(tweets);
	});
});

app.listen(process.env.PORT || port, () =>
	console.log(
		`Application is running, locally it will be at http://localhost:${port}!`
	)
);
