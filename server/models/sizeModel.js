const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    Name: {
        type: String,
        trim: true,
        require: true,
        unique: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Size', SizeSchema);