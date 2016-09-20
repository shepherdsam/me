var restify = require('restify');
var plugins = require('restify-plugins');
var fs = require('fs');

var main = function() {
  // HTTP
  var server = restify.createServer({
    name: 'shepherdsam.me'
  });

  server.get(/.*/, function(req, res, next) {
    var url = 'https://' + req.headers.host + req.url;
    return res.redirect(301, url, next);
  });
  server.listen(8080);

  // HTTPS
  var server = restify.createServer({
    certificate: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/privkey.pem'),
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

  // Index.html
  server.get('/', plugins.serveStatic({
    directory: './public',
    file: 'index.html'
  }));

  // Everything else
  server.get(/.*/, plugins.serveStatic({
    directory: './public'
  }));

  server.listen(8443);
};

main();