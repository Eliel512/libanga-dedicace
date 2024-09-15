const mongoose = require('mongoose'), { Schema } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'option'
    }],
    ticketPrice: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;