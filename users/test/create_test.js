const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {
	it('saves a user', (done) => {
		const saurav = new User({
			name: 'Saurav'
		});
		saurav.save()
		.then(() => {
			assert(!saurav.isNew);
			done();
		});
	});
}); 