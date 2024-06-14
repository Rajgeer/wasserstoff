const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    date: Date,
});

module.exports = mongoose.model('Post', postSchema);