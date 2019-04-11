require("dotenv").config();
const cors = require("cors");
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

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", cors(corsOptions), (req, res) => {
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
