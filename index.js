var restify = require('restify');
var plugins = require('restify-plugins');
var fs = require('fs');

var getConfig = function getConfig() {
  var config = {
    https: process.env.HTTPS == 'true',
    httpPort: 8080,
    httpsPort: 8443
  };

  return config;
};

var getHTTPServer = function() {
  var server = restify.createServer({
    name: 'shepherdsam.me'
  });

  return server;
};

var getHTTPSServer = function getHTTPSServer() {
  var server = restify.createServer({
    certificate: fs.readFileSync('./ssl/cert.pem'),
    key: fs.readFileSync('./ssl/privkey.pem'),
    ca: fs.readFileSync('./ssl/chain.pem'),
    name: 'shepherdsam.me'
  });

  return server;
};

var main = function() {
  var config = getConfig();

  if (config.https) {

    // Redirect Server
    var redirectServer = getHTTPServer();

    redirectServer.get(/.*/, function(req, res, next) {
      var url = 'https://' + req.headers.host + req.url;
      return res.redirect(301, url, next);
    });
    redirectServer.listen(config.httpPort);
  }

  // Main Server
  var server = config.https ? getHTTPSServer() : getHTTPServer();

  // Plugins
  server.use(plugins.gzipResponse());

  /*
   * ROUTES
   */

  server.get('/hello', function(req, res, next) {
    res.send(200, 'Hi!');
    return next();
  });

  // ** Staic Content ** //

  // Index.html
  server.get('/', plugins.serveStatic({
    directory: './public',
    file: 'index.html'
  }));

  // Everything else
  server.get(/.*/, plugins.serveStatic({
    directory: './public'
  }));

  server.listen(config.https ? config.httpsPort : config.httpPort);
};

main();