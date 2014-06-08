// libs
var http = require("http"),
    express = require('express');

// data
var weddingParty = require('./data/wedding-party'),
    lodging = require('./data/braidwood-lodging');

var app = express();

app.set("port", process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
    {
      title: 'Home',
      weddingParty: weddingParty,
      lodging : lodging
    }
  );
});

http.createServer(app).listen(app.get("port"), function() {
  return console.log("Server listening on port " + app.get("port"));
});