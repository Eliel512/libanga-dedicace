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
        type: Number,
        required: true
    }
});

const Option = mongoose.model('option', optionSchema);

module.exports = Option;