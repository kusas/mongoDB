const assert = require('assert');
const User = require('../src/user');

describe('Validation before creating the record', () => {
	it('requires a username', () => {
		const user = new User({});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		//console.log(validationResult);
		assert(message === 'Name is required');

	});

	it('requires a username to be < 2', () => {
		const user = new User({name : 'Al'});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		//console.log(validationResult);
		assert(message === 'Name should be more than 2 chars');

	});

	it('disallow invalid record to be saved', (done) => {
		const user = new User({name : 'Al'});
		user.save()
			.then(() => {
				done();
			})
			.catch((validationResult) => {
				const {message} = validationResult.errors.name;
				assert(message === 'Name should be more than 2 chars');
				done();
			});
	});
});