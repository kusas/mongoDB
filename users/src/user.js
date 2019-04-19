const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require('./post');

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name should be more than 2 chars'
		},
		required: [true, 'Name is required']
	},
	posts: [postSchema],
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}],
	likes: Number
});

UserSchema.virtual('postCount').get(function (){
	return this.posts.length;
})
const User = mongoose.model('user', UserSchema);

module.exports = User;