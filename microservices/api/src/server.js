var express = require('express');
var app = express();
var router = express.Router();
var request = require("request");

var server = require('http').Server(app);

var mapboxToken = process.env.mapbox_token;

app.get('/geocoding/forward/:location', function(req, res){
	var URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/t+'+req.params.location+.json?access_token='+mapboxToken';
	request(URL, function (error, response, body) {
		if(!error) {
			var data = JSON.parse(body);
			res.send(data);
		}
		else
			res.status(404).send("Not found");
	});
});

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
  res.send('Try the URL : '+req.get('host')+'/{Source Longitude}/{Source Latitude}/{Destination Longitude}/{Destination Latitude}');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
