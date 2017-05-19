var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var hbs = require("hbs");
var user = require("./user");
var app = express();
var someUser;

app.set("view engine", "hbs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true /*allows us to get data from our form in json*/
}));

app.get("/", function(req, res){
	res.render("home");
});

app.get("/data", function(req, res){
	res.render("data", {
		user: someUser
	});
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", function(req, res){
	user.findOne({"username": req.body.username}, function(err, user){
		if(err){
			console.log(err)
		} else {
			someUser = user;
			res.redirect("/data");
		}
	});
});

app.get("/signup", function(req, res){
	res.render("signup");
});

app.post("/signup", function(req, res){
	new user({
		username: req.body.username,
		password: req.body.password
	}) .save(function(err){
		if(err){
			console.log(err);
		} else{
			res.redirect("/login");
		}
	});
});

mongoose.connect("mongodb://localhost/user")

app.listen(8080);