var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, './client')));
app.listen(8777, function() {
	console.log('open browser to: 8777');
});