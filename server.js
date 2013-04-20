var fs = require('fs'),
    async = require('async'),
    _ = require('underscore'),
    sep = require('path').sep,
    marked = require('marked-ditaa'),
    handlebars = require('handlebars'),
    tmpl = handlebars.compile(fs.readFileSync('./templates/layout.handlebars', 'utf8')),
    errorTmpl = handlebars.compile(fs.readFileSync('./templates/error.handlebars', 'utf8')),
    dir = require('path').dirname(__dirname),
    express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 4567;


app.get('*/', function(req, res) {

  var file = __dirname + req.path + 'README.md';

  fs.exists(file, function(exists) {
    if (exists) {
      mdToHtml(file, function(html) {
        res.send(html);
      });
    } else {
      errorPage(file, function(html) {
        res.send(html);
      });
    }
  });
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port);

console.log('view docs at http://0.0.0.0:' + port);

/**
 * Takes a path and returns the folder names between it and the directory
 * the script was executed from as an array.
 *
 * @method  getBreadcrumbs
 * @param  {String} path The path to get breadcrumbs for.
 * @return {String[]}    Array of breadcrumbs.
 */
function getBreadcrumbs(path) {

  var paths = path.split(sep),
      start = __dirname.split(sep);

  start.pop();

  return _.difference(paths, start);
}

/**
 * Get a list of the subdirectories of `path`.
 *
 * @method  getSubDirs
 * @param  {String}   path     The path to get subdirs of.
 * @param  {Function} callback The callback function.
 *   @param {String[]} callback.dirs Array of directory names passed to function.
 */
function getSubDirs(path, callback) {
  var dirs = [];

  fs.readdir(path, function(err, files) {
    async.each(files, function(file, next) {
      fs.stat(path + sep + file, function(err, stats) {
        if(stats.isDirectory()) {
          dirs.push(file);
        }
        next();
      });
    }, function(err) {
      if (err) {
        console.error(err);
      }
      callback(dirs);
    });
  });
}

/**
 * Takes a markdown file and converts it to html.
 *
 * @method  mdToHtml
 * @param  {String}   filename The location of the MD file on disk.
 * @param  {Function} callback Function to call. HTML stream as arg.
 */
function mdToHtml(filename, callback) {

  fs.readFile(filename, 'utf8', function(err, data) {

    var path = filename.substr(0, filename.lastIndexOf(sep));

    getSubDirs(path, function(subdirs){

      var html;

      html = tmpl({
        content: marked(data),
        dir: dir,
        subdir: subdirs,
        breadcrumbs: getBreadcrumbs(path)
      });

      callback(html);
    });
  });
}

/**
 * Returns an error page with retaining links to navigate to the subdirectories.
 *
 * @method  errorPage
 * @param  {String}   filename The location of the non-existed file.
 * @param  {Function} callback Function to call. HTML stream as arg.
 */
function errorPage(filename, callback) {

  var path = filename.substr(0, filename.lastIndexOf(sep));

  getSubDirs(path, function(subdirs){

    var html;

    html = errorTmpl({
      dir: dir,
      subdir: subdirs,
      breadcrumbs: getBreadcrumbs(path)
    });

    callback(html);
  });
}