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
		if (data == 'image'){
			camera.getFile(err,function(file){
				if (!err){
					socket.send(file);
				}
			});
		}
	});
	socket.on('close',function(){
		console.log('Socket Closed.');
	});
});

var httpServer = http.createServer(function(request, response){
	var uri = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(), uri);
	if (uri == '/alert'){
		alert();
		response.writeHead(200);
    	response.write('Sound Played!');
    	response.end();
	}
	fs.exists(filename,function(exists){
		if(!exists){
			response.writeHead(404,{"Content-Type":"text/plain"});
			response.write("File not found.\n");
			response.end();
			return;
		}
		if (fs.statSync(filename).isDirectory()){
			filename += '/index.html';
		}
		fs.readFile(filename,"binary",function(err,file){
			if(err){
				response.writeHead(500,{"Content-Type": "text/plain"})
				response.write(err + "\n");
				response.end();
				return;
			}
			response.writeHead(200);
			response.write(file,"binary");
			response.end();
		});
	});
});

setInterval(camera.saveImage(function(error){
	console.log(error);
},function(filename){
	console.log('Image saved: '+filename);
}),5000);

httpServer.listen(httpPort);