const mongoose = require('mongoose')

// ES6 Promises
mongoose.Promise = global.Promise

// Connect to the db before tests run 
before((done) => {
	// Connection to mongodb
	mongoose.connect('mongodb://localhost/testaroo')

	mongoose.connection.once('open', () => {
	 	console.log('Connection has been made, now make fireworks...')
	 	done()
	}).on('err', (error) => {
		console.log(`Connection error: ${error}`)
	})
})

// Drop the characters collection before each test ,unique record
beforeEach((done) => {
	//Drop the collection
	mongoose.connection.collections.mariochars.drop(() => {
		done()
	})
})