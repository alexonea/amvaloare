var login = new Object();
var Database = require('../lib/database');
var crypto = require('crypto');
var db = new Database();

login.render = function (req, res) {

	if (req.session.user)
		res.redirect('/');
	else
		res.render('login', { title: 'Log In', status: 0 });
}

login.process = function (req, res) {

	if (req.session.user)
		res.redirect('/');
	else {
		var md5sum = crypto.createHash('md5');

		var user = new Object();
		user.email = req.body.email;
		user.password = md5sum.update(req.body.password.toString()).digest('hex');

		db.findUser(user.email, function (err, data) {
			if (err)
				console.log(err);

			if (data.length == 0)
				res.render('login', { title: 'Log In', status: 1 });
			else {
				if (data[0].password != user.password)
					res.render('login', { title: 'Log In', status: 2 });
				else {
					req.session.user = data[0];
					res.redirect('/');
				}
			}
		});
	}
}

module.exports = login;