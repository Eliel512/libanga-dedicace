const { Schema } = require('mongoose');
const User = require('./user.model');

const journalistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'option'
    }],
}, { timestamps: true, discriminatorKey: 'kind' });

const Journalist = User.discriminator('journalist', journalistSchema);

module.exports = Journalist;