
/*
 * GET home page.
 */

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];

exports.index = function(req, res){

	var logged = 0;
	var user = null;

	if (req.session.user) {
		logged = 1;
		user = req.session.user;
	}

	var date = new Date();
	var dateString = "";

	dateString += days[date.getDay()] + ", " + date.getDate().toString() + " " + months[date.getMonth()] + " ";
	dateString += date.getFullYear().toString();

	res.render('index', { title: 'amvaloare', logged: logged, username: (user ? user.name : null), date: dateString });
};