const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    Name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Color', ColorSchema);