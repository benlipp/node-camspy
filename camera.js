var Camelot = require('camelot');
var fs = require('fs');

var filename = 0000;

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
camelot.grab({},function(image){

});