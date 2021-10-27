const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
    Product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    Color_Size_Quantity: [
        {
            Color: {
                type: Schema.Types.ObjectId,
                ref: 'Color'
            },
            Size_Quantity: [
                {
                    Size: {
                        type: Schema.Types.ObjectId,
                        ref: 'Size'
                    },
                    Quantity: Number
                },
            ]
        }
    ]
}, { timestamps: true })
module.exports = mongoose.model('ProductDetail', ProductDetailSchema);