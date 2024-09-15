const { Schema } = require('mongoose');
const User = require('./user.model');

const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['dj', 'artist'],
        required: true
    },
    genres: {
        type: [String]
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

const Artist = User.discriminator('artist', artistSchema);

module.exports = Artist;