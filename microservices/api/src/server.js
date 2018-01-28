var express = require('express');
var app = express();
var router = express.Router();
var request = require("request");
var path = require('path');

var server = require('http').Server(app);

//Public access token
var mapboxToken = 'pk.eyJ1Ijoiam9obmRvZS0iLCJhIjoiY2pidXd1bm92MXJjZzJ3bzBsNGY4NGNvdSJ9.0qO3UooEMGh-UEQzS9Oyaw';//process.env.mapbox_token;

app.get('/:sLong/:sLat/:dLong/:dLat', function(req, res) {
  var URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'+req.params.sLong+','+req.params.sLat+';'+req.params.dLong+','+req.params.dLat+'.json?access_token='+mapboxToken;
  request(URL, function (error, response, body) {
		if(!error) {
			var data = JSON.parse(body);
			res.send(data);
		}
		else
			res.status(404).send("Not found");
	});
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
