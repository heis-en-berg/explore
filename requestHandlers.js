var querystring = require('querystring'),
	fs = require('fs'),
	formidable = require('/usr/local/lib/node_modules/formidable'),
	static = require( 'node-static' ),
	spawn = require('child_process').spawn;
;

var fileServer = new static.Server('./public');

function start(response,request){
	request.addListener('end', function () {
		fileServer.serveFile("looks.html", 500, {}, request, response);
    }).resume();
}

function loadImages(response,request, pathname){
	request.addListener('end', function () {
		fileServer.serveFile(pathname, 500, {}, request, response);
    }).resume();
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
			fs.rename(files.upload.path, "/tmp/test.jpg", function(err){
			if(err){
				fs.unlink("/tmp/test.jpg");
				fs.rename(files.upload.path, "/tmp/test.jpg");
			}
			});
			response.writeHead(200, {"Content-type": "text/html"});
			response.write("Received image : <br/>");
			response.write("<img src='/show' />");
			response.end();
		}
	});
}

function lifeStyleUpload(response,request){
	fs.readFile("/tmp/test.jpg", "binary", function(error, file){
		if(error){
		} else{
			fs.unlink("/tmp/test.jpg");
		}
	});
	fs.writeFile('category.txt', 'LifeStyle', 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
	}); 
	console.log("Request handler lifeStyleUpload() was called.");
	request.addListener('end', function () {
		fileServer.serveFile("upload.html", 500, {}, request, response);
    }).resume();
    //response.end();
 	//show(response);
}

function electronicsUpload(response,request){
	fs.readFile("/tmp/test.jpg", "binary", function(error, file){
		if(error){
		} else{
			fs.unlink("/tmp/test.jpg");
		}
	});
	fs.writeFile('category.txt', 'Electronics', 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
	}); 
	console.log("Request handler electronicsUpload() was called.");
	request.addListener('end', function () {
		fileServer.serveFile("upload.html", 500, {}, request, response);
    }).resume();
}

function booksUpload(response,request){
	fs.readFile("/tmp/test.jpg", "binary", function(error, file){
		if(error){
		} else{
			fs.unlink("/tmp/test.jpg");
		}
	});
	fs.writeFile('category.txt', 'Books', 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
	}); 
	console.log("Request handler booksUpload() was called.");
	request.addListener('end', function () {
		fileServer.serveFile("upload.html", 500, {}, request, response);
    }).resume();
}

function foodUpload(response,request){
	fs.readFile("/tmp/test.jpg", "binary", function(error, file){
		if(error){
		} else{
			fs.unlink("/tmp/test.jpg");
		}
	});
	fs.writeFile('category.txt', 'Food', 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
	}); 
	console.log("Request handler foodUpload() was called.");
	request.addListener('end', function () {
		fileServer.serveFile("upload.html", 500, {}, request, response);
    }).resume();
}

function show(response){
	console.log("Request handler show() was called.");
	fs.readFileSync('category.txt', 'utf8');
	spawn('python3.5',['./tf_files/label_image.py','/tmp/test.jpg']);
	console.log(fs.readFileSync('./tf_files/result.txt', 'utf8'));
	/*response.writeHead(200, {"Content-type" : "text/plain"});
	response.write(fs.readFileSync('./tf_files/result.txt', 'utf8'));
	response.end();*/
	/*fs.readFile("/tmp/test.jpg", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-type" : "text/plain"});
			response.write("error"+"\n");
			response.end();
		} else{
			response.writeHead(200, {"Content-type" : "text/plain"});
			response.write(file, "binary");
			response.end();
		}
	});*/
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.loadImages =loadImages;
exports.foodUpload=foodUpload;
exports.booksUpload=booksUpload;
exports.electronicsUpload=electronicsUpload;
exports.lifeStyleUpload=lifeStyleUpload;