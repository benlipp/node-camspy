// 2015 (C) Ben Lippincott

// I'm feeling anti-semicolon today

var Camelot = require('camelot')
var BinaryServer = require('binaryjs').BinaryServer
var fs = require('fs')

var binServer = BinaryServer({port : 9000});
var camelot = new Camelot({
  'rotate' : '180',
  'flip' : 'v'
})

binServer.on('connection',function(client){
	camelot.grab({'frequency' : 3},function(image){
		client.send(image)
	})
})