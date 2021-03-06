module.exports = function(grunt) {
  var express = require("express");
  grunt.registerTask("dev_server", "static file development server", function() {
    var app, webPort, webRoot;
    webPort = grunt.config.get("server.web.port") || 8000;
    webRoot = grunt.config.get("server.base") || "dev";

    app = express();
    app.use(express.static("" + (process.cwd()) + "/" + webRoot));
    app.use(express.errorHandler());
    app.listen(webPort);

    grunt.log.writeln("Starting express web server on \"http://localhost:8000/\"");

    return app;
  });
};
