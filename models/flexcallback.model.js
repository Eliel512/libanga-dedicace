const mongoose = require('mongoose'), { Schema } = require('mongoose');

const flexSchema = new Schema({
    details: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const Flex = mongoose.model('flexcallback', flexSchema);

module.exports = Flex;