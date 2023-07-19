var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var app = express();
var appViews = path.join(__dirname, '/views/');
var nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};
nunjucks.configure(appViews, nunjucksConfig);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
app.get('/', function (req, res) {
    res.render('list-jobroles');
});
require("./controller/JobRoleController")(app);
