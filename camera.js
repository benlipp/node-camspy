var Camelot = require('camelot');
var fs = require('fs');
var path = require('path');

var camOptions = {
  verbose: false,
  device : '/dev/video0',
  resolution : '590x440',
  png : '1',
  greyscale : false,
  controls : {
    focus : 'auto',
    brightness : 130,
    contrast : 50,
    saturation : 50,
    hue : 100,
    gamma : 130,
    sharpness : 50
  }
};
var camelot = new Camelot(camOptions);
var imageDir = path.resolve('images/');
var latestFile = '0';

exports.getFile = function(error,fileBuffer){
	fs.readDir(imageDir,function(err,files){
		if(err)
			error(err);

		filename(path.basename(last));
		fs.readFile(filename,function(err,data){
			if (err)
				error(err);
			fileBuffer(data);
		})
	});
}

function getLastFile(error,filename){
	fs.readdir(imageDir,function(err,files){
		if(err)
			error(err);
		if(!files){
			filename('0');
		} else {
			console.log(files);
			var last = files[files.length-1];
			console.log(last);
			filename(path.basename(last));
		}
	});
}

function getImage(errCb,imageCb){
	camelot.grab({},function(image){
		imageCb(image);
	});
	camelot.on('error',function(error){
		errCb(error);
	});
};

exports.saveImage = function(error,success){
	getImage(function(imgErr){
		if (imgErr)
			error(imgErr);
	},function(image){
		getLastFile(function(err){
			if(err)
				error(err);
		},function(latest){
			console.log('latestFile:');
			console.log(latest);
			latest++;
			filename = latest + '.png';
			fs.writeFile(filename,image,function(err){
				if(err)
					error(err);
				success(filename);
			});
		});
	});
};