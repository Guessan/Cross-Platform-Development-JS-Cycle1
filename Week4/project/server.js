var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

app.get("/hello", (request, respond) => {
	respond.json(
		{
			"hello": "Hello Me",
			"Syntax": "Boii we outchea learnin!"
		}
	);
	//respond.end();
});

/*respond.end(); is necessary bc it tells the server to stop reading, and actually run the code*/

app.post("/hello", (request, respond) =>{
	console.log(request.body);
})

app.listen(8080);
console.log("Server is running!");