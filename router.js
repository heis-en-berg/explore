path = require('path');

exports.route = function(handle, pathname, response, request){
	console.log('About to route to a request for '+ pathname);
	if(path.extname(pathname) === '.html' || path.extname(pathname) === '.jpg'){
		handle['/loadImages'](response,request,pathname);
	}
	else if(typeof handle[pathname] === 'function'){
		handle[pathname](response, request, pathname);
	} 
	else{
		console.log('No request handler found for '+ pathname);
		response.writeHead(404, {"Content-type": "text/plain"});
		response.write("404 Not Found");
		response.end();
	}
}