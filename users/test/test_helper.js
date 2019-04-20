var mongoose = require('mongoose');

before((done) => {
	mongoose.connect('mongodb://127.0.0.1/user_test');
	mongoose.connection
		.once('open', () => {
			console.log('connection established !!!');
			done();
		})
		.on('error', (error) => {
			console.log('Error !!! '+ error);
		});
});

beforeEach((done) => {
	mongoose.connection.collections.users.drop(
		() => {
			mongoose.connection.collections.comments.drop(
				() => {
					mongoose.connection.collections.blogposts.drop( () => done());
				} 
			)
		}	
	);
});