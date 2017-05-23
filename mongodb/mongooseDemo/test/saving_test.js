const assert = require('assert')
const MarioChar = require('../models/mariochar')

// Describe tests
describe('Saving records', () => {

	// Create tests
	it('Saves a record to the database', (done) => {

		let char = new MarioChar({
			name: 'Mario'
		})

		char.save().then(() => {
			assert(char.isNew === false)
			done()
		})


	})

})