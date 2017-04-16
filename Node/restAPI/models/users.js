const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create users Schema & model
const UsersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name fields is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UsersSchema);

module.exports = User;