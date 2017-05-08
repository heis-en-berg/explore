var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle["/upload"] = requestHandlers.upload;
handle["/loadStaticFile"] = requestHandlers.loadStaticFile;
handle["/lifeStyleUpload"] = requestHandlers.lifeStyleUpload;
handle["/"] = requestHandlers.loadStaticFile;
handle["/electronicsUpload"] = requestHandlers.electronicsUpload;
handle["/booksUpload"] = requestHandlers.booksUpload;
handle["/foodUpload"] = requestHandlers.foodUpload;

server.start(router.route, handle);