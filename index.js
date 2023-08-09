const express = require("express");
const app = express();
// console.dir(app);
const port = 3000;
// 	we can't have an http request that has more than one response so we comment this out
// app.use((req, res, next) => {
// 	console.log("We got a new request");
// 	// res.send("I my God it's working");
// });
//root route
app.get("/", (req, res) => {
	res.send("Hello Home!");
});
app.get("/cats", (req, res) => {
	res.send("Hello Cats!");
});
app.get("/dogs", (req, res) => {
	res.send("Hello Dogs!");
});
app.post("/cats", (req, res) => {
	res.send("Oh my god the post request is working too!");
});

app.get("/r/:subreddit/:postId", (req, res) => {
	console.log(req.params);
	const { subreddit, postId } = req.params;
	res.send(`Browsing the ${subreddit} with a postId of ${postId}`);
});

app.get("/search", (req, res) => {
	console.log(req.query);
	const { q } = req.query;
	console.log(`${q}`);
	res.send(`you searched for ${q}`);
});
//404
app.get("*", (req, res) => {
	res.send(`You got lost`);
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
