var Database = require('../lib/database.js');
var db = new Database();
var update = new Object();

update.income = function (req, res) {
	if (req.session.user) {

		var transaction = new Object();

		transaction.id = db.ObjectId();
		transaction.userId = req.session.user.id;
		transaction.type = true;
		transaction.endpoint = req.body.endpoint;
		transaction.value = parseInt(req.body.value);
		transaction.date = req.body.date;
		transaction.category = req.body.category;
		transaction.recurring = (req.body.recurring) ? true : false;

		if (transaction.recurring) {
			transaction.frequency = req.body.frequency;
			transaction.unit = req.body.unit;
		}
		
		db.addTransaction(transaction, function (err) {
			if (err) console.log(err);

			db.updateUserBudget(req.session.user.id, transaction.value, function (err) {
				if (err) console.log(err);
				res.redirect('/');
			});
		});

	} else
		res.redirect('/');
};

update.expense = function (req, res) {
	if (req.session.user) {

		var transaction = new Object();

		transaction.id = db.ObjectId();
		transaction.userId = req.session.user.id;
		transaction.type = false;
		transaction.endpoint = req.body.endpoint;
		transaction.value = parseInt(req.body.value);
		transaction.date = req.body.date;
		transaction.category = req.body.category;
		transaction.recurring = (req.body.recurring) ? true : false;

		if (transaction.recurring) {
			transaction.frequency = req.body.frequency;
			transaction.unit = req.body.unit;
		}
		
		db.addTransaction(transaction, function (err) {
			if (err) console.log(err);

			db.updateUserBudget(req.session.user.id, -transaction.value, function (err) {
				if (err) console.log(err);
				res.redirect('/');
			});
		});

	} else
		res.redirect('/');
};

module.exports = update;