const mongoose = require('mongoose'), { Schema } = require('mongoose');

const dedicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dedicationText: {
        type: String,
        required: true
    },
    option: {
        type: Schema.Types.ObjectId,
        ref: 'option',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Dedication = mongoose.model('dedication', dedicationSchema);

module.exports = Dedication;