var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/loadImages"] = requestHandlers.loadImages;
handle["/lifeStyleUpload"] = requestHandlers.lifeStyleUpload;
handle["/electronicsUpload"] = requestHandlers.electronicsUpload;
handle["/booksUpload"] = requestHandlers.booksUpload;
handle["/foodUpload"] = requestHandlers.foodUpload;

server.start(router.route, handle);