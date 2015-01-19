var engine = require('engine.io').listen('9000');
var fs = require('fs');
var http = require("http");
var url = require("url");
var path = require("path");
var httpPort = process.argv[2] || 8888;

var alert = require('./alert').alert();
var camera = require('./camera');

engine.on('connection',function(socket){
	socket.on('message', function(data){

	});
	socket.on('close',function(){
		console.log('Socket Closed.')
	})
});