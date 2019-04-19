const assert = require('assert');
const User = require('../src/user');

function assertName(operation, done){
	operation
		.then(() => User.find({}))
		.then((users) => {
			assert(users[0].name == 'Alex');
			assert(users.length == 1);
			done();
		});
}

describe('updating a user', () => {
	beforeEach((done) => {
		joe = new User({name: 'joe', likes: 0});
		joe.save()
		    .then(() => done());
	});

	it('model instance update', (done) => {
		assertName(joe.update({name: 'Alex'}) , done);
	});

	it('set and save', (done) => {
		joe.set({name: 'Alex'});
		assertName(joe.save() , done);
	});

	it('model update by property', (done) => {
		assertName(User.findOneAndUpdate({name: 'joe'}, {name: 'Alex'}) , done);
	});

	it('update by id', (done) => {
		assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}) , done);
	});

	it('update increment operator', (done) => {
		User.update({name: 'joe'}, {$inc: {'likes': 10}})
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				assert(user.likes === 10);
				done();
			});
	});
			
});