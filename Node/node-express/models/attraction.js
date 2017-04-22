const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attractionSchema = new Schema({
    name: String,
    description: String,
    location: { lat: Number, lng: Number },
    history: {
        event: String,
        notes: String,
        email: String,
        date: Date,
    },
    updateId: String,
    approved: Boolean,
});

const Attraction  = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction ;