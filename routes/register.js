var register = new Object();
var Database = require('../lib/database');
var crypto = require('crypto');
var db = new Database();

register.render = function (req, res) {

	if (req.session.user)
		res.redirect('/');
	else
		res.render('register', { title: 'Register', ready: 0 });
}

register.process = function (req, res) {

	if (req.session.user)
		res.redirect('/');
	else {

		var md5sum = crypto.createHash('md5');

		var user = new Object();
		user.id = db.ObjectId();
		user.name = req.body.fullName;
		user.email = req.body.email;
		user.password = md5sum.update(req.body.password.toString()).digest('hex');

		db.addUser(user, function (err) {
			if (err)
				console.log(err);
			res.render('register', { title: 'Congratulation', ready: 1 });
		});
	}
}

module.exports = register;