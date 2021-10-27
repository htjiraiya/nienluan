const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    Fullname: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Birthday: {
        type: String,
    },
    Sex: {
        type: String,
    },
    Address: {
        type: String,
    },
    Phone: {
        type: String,
        require: true,
    },
    Role: {
        type: Number,
        default: 0,
    },
    Cart: [{
        Product_id: {
            type: String,
            ref: 'Product'
        },
        Quantity_Select: Number,
        Size_Select: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Users', User);