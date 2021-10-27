
const Category = require('../models/categoryModel');
const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            const {Name,Discount} = req.body;
            const category = await Category.findOne({Name});
            if(category) return res.status(400).json({ msg: "Loại đã tồn tại" })
            const newCategory = new Category({Name,Discount});
            newCategory.save();
            res.status(200).json({msg:"Thêm thành công!!!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {Name, Discount} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {Name,Discount})
            res.status(200).json({ msg: "Cập nhật thành công" })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Xóa thành công" });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}
module.exports = categoryCtrl;