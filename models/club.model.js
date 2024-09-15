const { Schema } = require('mongoose');
const User = require('./user.model');

const clubSchema = new Schema({
    name: {
        type: String,
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
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }]
}, { timestamps: true, discriminatorKey: 'kind' });

const Club = User.discriminator('club', clubSchema);

module.exports = Club;