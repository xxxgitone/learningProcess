const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
// }
//create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

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
    },
    geometry: GeoSchema
});

const User = mongoose.model('user', UsersSchema);

module.exports = User;