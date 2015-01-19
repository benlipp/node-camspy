var util = require('util');
var exec = require('child_process').exec;
var child;

exports.alert = function(){
	child = exec('sh alert.bash', // command line argument directly in string
	    function(error, stdout, stderr){      // one easy function to capture data/errors
	      console.log('stdout: ' + stdout);
	      console.log('stderr: ' + stderr);
	      if (error !== null) {
	        console.log('exec error: ' + error);
	      }
	    }
	);
}