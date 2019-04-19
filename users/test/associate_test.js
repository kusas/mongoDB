const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

 describe('Association', () => {
	beforeEach((done) => {
		let user = new User({
			name: 'joe'
		});
		let comment = new Comment({
			content: 'congrats on bolg'
		});
		let blogPost = new BlogPost({
			title: 'Title 1',
			content: 'Content 1'
		});
		user.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = user;
		Promise.all([user.save(), blogPost.save(), comment.save()])
			.then(() => done());

	});

	it('read from association', (done) => {
		User.findOne({name: 'joe'})
			.populate({
        		path: 'blogPosts',
        		populate: {
          			path: 'comments',
          			model: 'comment',
          			populate: {
            			path: 'user',
            			model: 'user'
          			}
        		}
      		})
			.then((user) => {
				assert(user.name === 'joe');
				assert(user.blogPosts[0].title === 'Title 1');
				assert(user.blogPosts[0].comments[0].content === 'congrats on bolg');
				assert(user.blogPosts[0].comments[0].user.name === 'joe');
				done();
			});
	})
});