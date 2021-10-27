const Products = require('../models/productModel');
// const ProductDetail = require('../models/productDetailModel');
const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await Products.find()
                .populate({ path: 'Category', select: '-createdAt -updatedAt -__v' })
                .populate({ path: 'Color', select: '-createdAt -updatedAt -__v' })
                .populate({
                    path: 'Size_Quantity',
                    populate: { path: 'Size', select: '-createdAt -updatedAt -__v' }
                })
            res.json(products);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
                .populate({ path: 'Category', select: '-createdAt -updatedAt -__v' })
                .populate({ path: 'Color', select: '-createdAt -updatedAt -__v' })
                .populate({
                    path: 'Size_Quantity',
                    populate: { path: 'Size', select: '-createdAt -updatedAt -__v' }
                })
            res.json(product);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { Name, Category, Export_price, Img, Color, Description, Size_Quantity } = req.body;
            const product = await Products.findOne({Name, Color})
                .populate({ path: 'Color', select: '-createdAt -updatedAt -__v' });
            
            if(product) return res.status(400).json({msg: `Tên sản phẩm: ${Name} với màu ${product.Color.Name} đã thêm trước đó`});
            const newPrice = new Number(Export_price);
            const newProduct = new Products({
                Name,
                Category,
                Export_price: newPrice,
                Size_Quantity,
                Color,
                Img,
                Description
            });
            await newProduct.save();
            res.json({ msg: "Thêm thành công" });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            await Products.findOneAndUpdate({_id: req.params.id}, req.body)
            res.status(200).json({ msg: "Cập nhật thành công" })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Xóa thành công" });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}
module.exports = productCtrl;