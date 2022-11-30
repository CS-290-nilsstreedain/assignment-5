/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:
 * Email:
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

var postData = require('./postData.json');
app.engine('handlebars', exphbs.engine({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
	res.status(200).render('postsPage', postData);
});

app.get('/posts/:n', function (req, res, next) {
	if ((req.params.n >= 0) && (req.params.n <= postData.length - 1)) {
		res.status(200).render('partials/post', postData[req.params.n]);
	} else {
		res.status(404).render('404');
	}
});

app.get('*', function (req, res) {
	res.status(404).render('404');
});

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});
