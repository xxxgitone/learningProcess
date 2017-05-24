const assert = require('assert')
const MarioChar = require('../models/mariochar')

// Describe tests
describe('Deleting records', () => {

	let char

	// 在本区块的每个测试用例之前执行
	beforeEach((done) => {
		char = new MarioChar({
			name: 'Mario'
		})

		char.save().then(() => {
			done() // 通知Mocha测试结束
		})
	})

	// Create tests
	it('Deletes one  record from the database', (done) => {

		MarioChar.findOneAndRemove({name: 'Mario'}).then(() => {
			MarioChar.findOne({name: 'Mario'}).then((result) => {
				assert(result === null)
				done()
			})
		})

	})

})
