var querystring = require('querystring'),
	fs = require('fs'),
	formidable = require('/usr/local/lib/node_modules/formidable'),
	looks = require('./looks');


function start(response){
	console.log("Request handler start() was called.");
	response.writeHead(200, {"Content-type": "text/html"});
	response.write(looks.layout());
	response.end();
}

function upload(response, request){
	console.log("Request handler upload() was called.");
	var form = new formidable.IncomingForm();
	console.log('About to parse.');
	form.parse(request,function(error,fields,files){
		console.log('Parsing done. '+ typeof files.upload.size);
		if(files.upload.size === 0){
			response.writeHead(200, {"Content-type": "text/plain"});
			response.write("No image uploaded");
			response.end();
		}else{
			fs.rename(files.upload.path, "/tmp/test.png", function(err){
			if(err){
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
			});
			response.writeHead(200, {"Content-type": "text/html"});
			response.write("Received image : <br/>");
			response.write("<img src='/show' />");
			response.end();
		}
		
	});
}

function show(response){
	console.log("Request handler show() was called.");
	fs.readFile("/tmp/test.png", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-type" : "text/plain"});
			response.write("error"+"\n");
			response.end();
		} else{
			response.writeHead(200, {"Content-type" : "text/plain"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;