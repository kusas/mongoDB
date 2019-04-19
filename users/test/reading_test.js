const assert = require('assert');
const User = require('../src/user');

describe('Reading users', () => {
	var joe ;
	beforeEach((done) => {
		joe = new User({name: 'joe'});
		joe.save()
		.then(() => {
			done();
		});
	});

	it('find all users with joe', (done) => {
		User.find({name: 'joe'})
		.then((users) => {
			assert(users[0]._id.toString() === joe._id.toString());
			done();
		});
	});

	it('find one user with joe', (done) => {
		User.findOne({name: 'joe'})
		.then((users) => {
			assert(users._id.toString() === joe._id.toString());
			done();
		});
	});

	it('find one user with particular id', (done) => {
		User.findOne({_id: joe._id})
		.then((user) => {
			assert(user._id.toString() === joe._id.toString());
			done();
		});
	});
});