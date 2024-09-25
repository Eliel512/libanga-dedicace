const mongoose = require('mongoose'), { Schema } = require('mongoose');

const optionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const optionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        infos: {
            type: Schema.Types.ObjectId,
            required: true
        },
        model: {
            type: String,
            required: true
        }
    },
    Description: {
        type: String,
        required: true
    },
    options: [optionsSchema],
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ['USD', 'CDF'],
            default: 'CDF',
            required: true
        }
    }
});

const Option = mongoose.model('option', optionSchema);

module.exports = Option;