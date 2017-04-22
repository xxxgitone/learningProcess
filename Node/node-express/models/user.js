const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //mongodb数据库中有一个唯一的id，
    // 添加一个自己的ID,因为我们用了多个认证策略，为了防止冲突
    // 比如facebook用户的authID是11125
    // google的是25332
    authId: String,
	name: String,
	email: String,
	role: String,
	created: Date,
})

const User = mongoose.model('User', userSchema);
module.exports = User;