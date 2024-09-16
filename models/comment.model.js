const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        infos:{
            type: Schema.Types.ObjectId,
            required: true
        },
        model: {
            type: String,
            required: false
        }
    }
}, { timestamps: true });

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;