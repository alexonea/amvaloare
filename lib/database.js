var DATABASE_URI = process.env.MONGOLAB_URI.toString().trim() || null;

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI || 'mongodb://localhost/amvaloare');

var user = mongoose.Schema({
	id: String,
	name: String,
	email: String,
	password: String
});

mongoose.connection.once('open', function (err) {
	console.log('Connected to database!');
});

var User = db.model('user', user);

function Database() {
	var database = {};

	/* add user to database */
	database.addUser = function (options, cb) {
		var user = new User(options);

		user.save(cb);
	}

	/* get users from database */
	database.findUser = function (options, cb) {
		if (typeof options == 'string') options = {email: options};
		if (typeof options == 'undefined') options = {};
		User.find(options, cb);
	}

	database.ObjectId = function () {
		return (new mongoose.Types.ObjectId()).valueOf();
	};

	return database;
}

module.exports = Database;