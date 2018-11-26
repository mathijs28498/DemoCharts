const express = require("express");
const url = require("url");
const http = require("http");
const fs = require("fs");

const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);
console.log("The server is listening to " + port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/database", function (req, res) {
    var obj = JSON.parse(fs.readFileSync("database.json", "utf8"));
	console.log("Database requested!");
	res.json(obj);
});