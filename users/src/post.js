const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	name: String
});

module.exports = postSchema;