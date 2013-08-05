var update = new Object();

update.income = function (req, res) {
	if (req.session.user) {

		var transaction = new Object();

		transaction.type = true;
		transaction.endpoint = req.body.endpoint;
		transaction.value = req.body.value;
		transaction.date = req.body.date;
		transaction.category = req.body.category;
		transaction.recurring = (req.body.recurring) ? true : false;

		if (transaction.recurring) {
			transaction.frequency = req.body.frequency;
			transaction.unit = req.body.unit;
		}
		
		console.log(transaction);
		res.redirect('/');

	} else
		res.redirect('/');
};

module.exports = update;