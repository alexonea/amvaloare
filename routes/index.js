
/*
 * GET home page.
 */

exports.index = function(req, res){

	var logged = 0;
	var user = null;

	if (req.session.user) {
		logged = 1;
		user = req.session.user;
	}

	res.render('index', { title: 'amvaloare', logged: logged, username: (user ? user.name : null) });
};