const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
app.use(express.urlencoded({ extended: true })); //parse form encoded information from the request body/middlewareish
app.use(express.json()); //for parsing application/json
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// uuid();
let comments = [
	{ id: uuid(), username: "Todd", comment: "lol, that is so funny" },
	{ id: uuid(), username: "Bob", comment: "That isn't funny at all" },
	{ id: uuid(), username: "Joe", comment: "Your not funny" },
	{ id: uuid(), username: "Gabe", comment: "Sometimes its funny" },
	{ id: uuid(), username: "Glenn", comment: "It's a little funny" },
	{ id: uuid(), username: "Ron", comment: "I hate funny" },
];

app.get("/comments", (req, res) => {
	res.render("comments/index", { comments });
});
//this route serves the form
app.get("/comments/new", (req, res) => {
	res.render("comments/new");
});
//this route posts the data from the form
app.post("/comments", (req, res) => {
	console.log(req.body);
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuid() });
	res.redirect("/comments");
});
//details route, information about one particular resource
app.get("/comments/:id", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/show", { comment });
});

//route to serve the form for patch
app.get("/comments/:id/edit", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/edit", { comment });
});

//update route, patch is used to partially modify, put is used to completely replace
app.patch("/comments/:id", (req, res) => {
	const { id } = req.params; //take id from url
	const newCommentText = req.body.comment; //what ever was sent in the request body, the new payload
	const foundComment = comments.find((c) => c.id === id); //find comment with the matching id
	foundComment.comment = newCommentText; //update the comment body to be the new payload
	// console.log(req.body.comment);
	res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
	const { id } = req.params;
	comments = comments.filter((c) => c.id !== id);
	res.redirect("/comments");
});
// app.get("/tacos", (req, res) => {
// 	res.send("GET /tacos response");
// });

// app.post("/tacos", (req, res) => {
// 	console.log(req.body);
// 	const { meat, qty } = req.body;
// 	res.send(`OK, here are your ${qty} ${meat} tacos`);
// });

app.listen(3000, () => {
	console.log("ON PORT 3000!");
});
