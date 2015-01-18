// 2015 (C) Ben Lippincott

// I'm feeling anti-semicolon today

var Camelot = require('camelot')
var BinaryServer = require('binaryjs').BinaryServer
var fs = require('fs')

var http = require("http")
var url = require("url")
var path = require("path")
var httpPort = process.argv[2] || 8888

var binServer = BinaryServer({port : 9000});
var camelot = new Camelot({
  'rotate' : '180',
  'flip' : 'v'
})

binServer.on('connection',function(client){
	camelot.grab({'frequency' : 3},function(image){
		client.send(image)
	})
	binServer.on('end',function(){
		client.close()
	})
})

http.createServer(function(request, response) {
  	var uri = url.parse(request.url).pathname
	var filename = path.join(process.cwd(), uri)

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"})
      response.write("404 Not Found\n")
      response.end()
      return
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html'

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"})
        response.write(err + "\n")
        response.end()
        return
      }

      response.writeHead(200)
      response.write(file, "binary")
      response.end()
    })
  })
}).listen(parseInt(httpPort, 10))
