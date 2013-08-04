var register = new Object();
register.render = function (req, res) {
	res.render('register', { title: 'Register' });
}

register.process = function (req, res) {
	res.render('register', { title: 'Create a new account' });
}

module.exports = register;