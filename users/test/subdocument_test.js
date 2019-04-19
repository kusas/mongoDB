const assert = require('assert');
const User = require('../src/user');

describe('create user with sub - document', () => {
	it('create with subdocument', (done) => {
		const joe = new User({
			name: 'joe', 
			posts: [{name: 'postTitle'}]
		});

		joe.save()
			.then(() =>
				 User.findOne({name: 'joe'})
			)
			.then((user) => {
				assert(user.posts[0].name == 'postTitle');
				done();
			});
	});

	it('add subdocument', (done) => {
		const joe = new User({
			name: 'joe', 
			posts: [{name: 'postTitle'}]
		});

		joe.save()
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				user.posts.push({name: 'new post'});
				return user.save();
			})
			.then(() => {
				return User.findOne({name: 'joe'});
			})
			.then((user) => {
				assert(user.posts[0].name === 'new post' || user.posts[1].name === 'new post');
				done();
			});
	});

	it('remove subdocument', (done) => {
		const joe = new User({
			name: 'joe1', 
			posts: [{name: 'postTitle'}]
		});

		joe.save()
			.then(() => User.findOne({name: 'joe1'}))
			.then((user) => {
				user.posts[0].remove();
				return user.save();
			})
			.then(() => {
				return User.findOne({name: 'joe1'});
			})
			.then((user) => {
				console.log(user);
				assert(user.posts.length === 0);
				done();
			});
	});
});