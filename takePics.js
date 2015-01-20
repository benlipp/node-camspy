var fs = require('fs');
var http = require("http");
var url = require("url");
var path = require("path");
var httpPort = process.argv[2] || 8888;

var camera = require('./camera');

function loop(){
	camera.saveImage(function(error){
		console.log(error);
	},
	function(filename){
		console.log('Image saved: '+filename);
	})
};

setInterval(loop(),5000);