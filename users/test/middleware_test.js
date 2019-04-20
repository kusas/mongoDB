const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

 describe('Middleware', () => {
 	let user;
	beforeEach((done) => {
			user = new User({
			name: 'joe'
		});
		let blogPost = new BlogPost({
			title: 'Title 1',
			content: 'Content 1'
		});
		user.blogPosts.push(blogPost);

		Promise.all([user.save(), blogPost.save()])
			.then(() => done());
	});

	it('remove a userserver with middleware', (done) => {
			User.findOne({name: 'joe'}) // works with user.remove() as well. not applicable for User.remove
				.then((user) => user.remove()) 
				.then(() => BlogPost.count())
				.then((count) => {
					assert(count === 0);
					done();
				});
	});
});