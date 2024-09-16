const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactMessageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('message', ContactMessageSchema);

module.exports = Message;