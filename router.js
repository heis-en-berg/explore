exports.route = function(handle, pathname, response, request){
	console.log('About to route to a request for '+ pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname](response, request);
	} else{
		console.log('No request handler found for '+ pathname);
		response.writeHead(404, {"Content-type": "text/plain"});
		response.write("404 Not Found");
		response.end();
	}
}