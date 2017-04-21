const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//在度假重新变得应季时发送邮件给客户,这里保存邮箱信息
const vacationInSeasonListenerSchema = new Schema({
    email: String,
    skus: [String]
})

const VacationInSeasonListenerSchema = mongoose.model('VacationInSeasonListenerSchema', vacationInSeasonListenerSchema)

module.exports = VacationInSeasonListenerSchema;