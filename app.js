var http = require("http"),
    express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    fontFace  = require('stylus-font-face');

var weddingParty = require('./data/wedding-party');

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(jeet())
    .use(rupture())
    .use(fontFace())
    .use(nib());
}

app.set("port", process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
    {
      title: 'Home',
      weddingParty: weddingParty
    }
  );
});

http.createServer(app).listen(app.get("port"), function() {
  return console.log("Express server listening on port " + app.get("port"));
});