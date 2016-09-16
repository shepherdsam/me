var restify = require('restify');
var plugins = require('restify-plugins');

var main = function() {
  var server = restify.createServer({
    name: 'shepherdsam.me'
  });

  server.use(plugins.gzipResponse());

  /*
   * ROUTES
   */

  server.get('/hello', function(req, res, next) {
    res.send(200, 'Hi!');
    return next();
  });

  server.get(/.*/, plugins.serveStatic({
    directory: './public',
    file: 'index.html'
  }));

  server.listen(8080);
};

main();