const Colors = require('../models/colorModel');
const colorCtrl = {
    getColor: async (req, res) => {
        try {
            const color = await Colors.find()
            res.json(color);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createColor: async (req, res) => {
        try {
            const {Name} = req.body;
            const color = await Colors.findOne({Name});
            if(color) return res.status(400).json({ msg: "Màu đã tồn tại" })
            const newColor = new Colors({Name});
            newColor.save();
            res.status(200).json({msg:"Thêm thành công!!!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateColor: async(req, res) =>{
        try {
            const {Name} = req.body;
            await Colors.findOneAndUpdate({_id: req.params.id}, {Name})
            res.status(200).json({ msg: "Cập nhật thành công" })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteColor: async(req, res) =>{
        try {
            await Colors.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Xóa thành công" });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}
module.exports = colorCtrl;