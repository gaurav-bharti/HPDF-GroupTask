var express = require('express');
var app = express();
var router = express.Router();
var request = require("request");
var path = require('path');

var mapboxSecretToken = process.env.mapbox_token;
var mapboxUsername = process.env.mapbox_username;
var mapboxPublicToken = '';
//In minutes (Must be between 0 and 60)
var tokenExpirationTime = 55;
//Time in minutes to request a new token before the previous one has expired
var tokenDifference = 5;


app.get('/geocoding/forward/:location', function(req, res){
	var URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/t+'+req.params.location+'.json?access_token='+mapboxSecretToken;
	request(URL, function (error, response, body) {
		if(!error) {
			var data = JSON.parse(body);
			res.send(data);
		}
		else
			res.status(404).send("Not found");
	});
});


app.get('/geocoding/backward/:long/:lang', function(req, res){
	var URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/+'+req.params.long+','+req.params.lang+'.json?access_token='+mapboxSecretToken;
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
  var URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'+req.params.sLong+','+req.params.sLat+';'+req.params.dLong+','+req.params.dLat+'.json?access_token='+mapboxSecretToken;
  request(URL, function (error, response, body) {
		if(!error) {
			var data = JSON.parse(body);
			res.send(data);
		}
		else
			res.status(404).send("Not found");
	});
});

requestNewToken();

app.get('/', function(req, res) {
	res.send(getIndexTemplate());
});

function addZero(data) {
	return (('0' + data).slice(-2));
}

function getExpirationTime() {
	var d = new Date();
	d.setMinutes(d.getMinutes() + tokenExpirationTime);
	return d.toISOString();
}

function requestNewToken() {
	var URL = 'https://api.mapbox.com/tokens/v2/' + mapboxUsername + '?access_token=' + mapboxSecretToken;
	request.post(URL, { json: { expires: ''+getExpirationTime() , scopes: ["styles:read", "fonts:read", "styles:tiles", "datasets:read"]} },
			function (error, response, body) {
				if(!error) {
					mapboxPublicToken = body['token'];
					setTimeout(tokenExpired, 1000*60*(tokenExpirationTime-tokenDifference));
				}
				else {
					//Retry after sometime
					setTimeout(requestNewToken, 1000*60*5);
				}
			}
		);
}

function tokenExpired() {
	requestNewToken();
}

function getIndexTemplate() {
	var template = `<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title>Display directions</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>

<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.1/mapbox-gl-directions.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.1/mapbox-gl-directions.css' type='text/css' />
<div id='map'></div>

<script>
mapboxgl.accessToken = '${mapboxPublicToken}';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [80.237343,13.040383],
    zoom: 3.5
});

map.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken
}), 'top-left');
</script>

</body>
</html>`;
return template;
}

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
