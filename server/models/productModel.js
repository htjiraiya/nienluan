const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Name: {
        type: String,
        trim: true,
        require: true
    },
    Category: {
        type: String, 
        ref: 'Category',
        require: true
    },
    Export_price: {
        type: Number,
        require: true
    },
    Color : {
        type: String,
        ref: 'Color',
        require: true
    },
    Size_Quantity: [{
        Size: {
            type: String, 
            ref: 'Size'
        },
        Quantity: Number
    }],
    Img :[{
        public_id: String,
        url: String
    }],
    Description: {
        type: String,
        trim: true
    }
}, {timestamps: true})
module.exports = mongoose.model('Product', ProductSchema);

// {
//     "Name": "Sản phẩm 3",
//     "Category":"614b4a220dc935835e9ff9f0",
//     "Import_price": 120000,
//     "Export_price": 140000,
//     "Img": [
//         {
//         "public_id": "adsdasd",
//         "url": "đâsdasdasdas"
//         },
//         {
//         "public_id": "abcabc",
//         "url": "qưeqweqwewqe"
//         }
//     ],
//     "Description": "Đây là test thêm sản phẩm 3",
//     "Color_Size_Quantity": [
//         {
//             "Color":"614dd780560e9610eb97d5bf",
//             "Size_Quantity": [
//                 {
//                     "Size": "614c8b07d25a44a98d1a8fa2",
//                     "Quantity": 100
//                 }
//             ]
//         },
//         {
//             "Color":"614dd780560e9610eb97d5bf",
//             "Size_Quantity": [
//                 {
//                     "Size": "614c8b07d25a44a98d1a8fa2",
//                     "Quantity": 100
//                 }
                
//             ]
//         }
//     ]
// }
