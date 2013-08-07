var DATABASE_URI = process.env.MONGOLAB_URI.toString().trim() || null;

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI || 'mongodb://localhost/amvaloare');

var user = mongoose.Schema({
	id: String,
	name: String,
	email: String,
	password: String,
	budget: Number,
	created: Date,
	currency: {
		type: String, enum: ['ron', 'usd', 'eur', 'gbp']
	}
});

var transaction = mongoose.Schema({
	id: String,
	userId: String,
	type: Boolean,
	endpoint: String,
	value: Number,
	date: Date,
	category: String,
	recurring: Boolean,
	unit: {
		type: Number, default: 0
	},
	frequency: {
		type: String, default: 'none'
	}
});

mongoose.connection.once('open', function (err) {
	console.log('Connected to database!');
});

var User = db.model('user', user);
var Transaction = db.model('transaction', transaction);

function Database() {
	var database = {};

	/* add user to database */
	database.addUser = function (options, cb) {
		var user = new User(options);

		user.save(cb);
	};

	/* update user's budget by value */
	database.updateUserBudget = function (userID, value, cb) {
		database.findUserById(userID, function (err, data) {
			
			if (err)
				console.log(err);

			if (data.length == 0) {
				console.log('no user found');
				cb();
			} else {
				data[0].budget += value;
				data[0].save(cb);
			}
		});
	};

	/* add transaction to database */
	database.addTransaction = function (options, cb) {
		var transaction = new Transaction(options);

		transaction.save(cb);
	};

	/* get users from database */
	database.findUserById = function (options, cb) {
		if (typeof options == 'string') options = {id: options};
		if (typeof options == 'undefined') options = {};
		User.find(options, cb);
	};

	database.findUserByEmail = function (options, cb) {
		if (typeof options == 'string') options = {email: options};
		if (typeof options == 'undefined') options = {};
		User.find(options, cb);
	};

	database.ObjectId = function () {
		return (new mongoose.Types.ObjectId()).valueOf();
	};

	/* get transactions from database */
	database.findTransactions = function (options, cb) {
		Transaction.find(options, cb);
	};

	return database;
}

module.exports = Database;