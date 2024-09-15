const mongoose = require('mongoose'), { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    privileges: [{
        kind: {
            type: String,
            required: true
        },
        permissions: [{
            type: String,
            required: true,
            enum: ['read', 'write']
        }]
    }]
}, { timestamps: true });

authSchema.plugin(uniqueValidator);

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;