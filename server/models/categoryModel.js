const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    Discount: {
        type: Number,
        default: 0
    }
},{ timestamps: true });
// stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
module.exports = mongoose.model('Category', CategorySchema);
