var Database = require('../lib/database.js');
var db = new Database();

var sync = function (req, res) {
	if (req.session.user) {
		var user = req.session.user;
		var requestID = req.body.rid;
		var type = req.body.type;

		requestID = parseInt(requestID);

		var options = {
			userId: user.id,
		};

		if (type == 1) options.type = true;
		if (type == -1) options.type = false;

		switch (requestID) {
		case 0:
			/* getting report for current week */
			var currentTime = new Date();
			var startTime = new Date(currentTime.getTime());
			startTime.setDate(startTime.getDate() - 7);
			startTime.setHours(0);
			startTime.setMinutes(0);

			options.date = {
				$gte: startTime,
				$lt: currentTime
			};

			db.findTransactions(options, function (err, data) {
				if (err) console.log(err);
				res.render('history', { data: data });
			});

			break;
		case 1:
			res.end();
			break;
		default:
			var error = {
				code: 1,
				description: 'bad request'
			};

			res.end(JSON.stringify(error));
			break;
		}

	} else {
		var error = {
			code: -1,
			description: 'not logged in'
		};

		res.end(JSON.stringify(error));
	}
};

module.exports = sync;