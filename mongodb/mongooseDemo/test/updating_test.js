const assert = require('assert')
const MarioChar = require('../models/mariochar')

// Describe tests
describe('Updating records', () => {

	let char

	// 在本区块的每个测试用例之前执行
	beforeEach((done) => {
		char = new MarioChar({
			name: 'Mario',
			weight: 50
		})

		char.save().then(() => {
			done() // 通知Mocha测试结束
		})
	})

	// Create tests
	it('Updates one  record in  the database', (done) => {

		MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then(() => {
			MarioChar.findOne({_id: char._id}).then((result) => {
				assert(result.name === 'Luigi')
				done()
			})
		})

	})

	it('Increments the weight by 1', (done) => {

		MarioChar.update({}, { $inc: {weight: 1 } }).then(() => {
			MarioChar.findOne({name: 'Mario'}).then((record) => {
				assert(record.weight === 51)
				done()
			})
		})

	})

})
