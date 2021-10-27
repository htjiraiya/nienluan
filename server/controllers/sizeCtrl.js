const Sizes = require('../models/sizeModel');

const SizeCtrl = {
    getSize: async (req, res)=> {
        try {
            const size = await Sizes.find();
            res.status(200).json(size);
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
    },
    createSize: async (req, res)=>{
        try {
            const {Name} = req.body;
            const size = await Sizes.findOne({Name});
            if(size) return res.status(400).json({msg: "Kích cỡ đã có, vui long thử lại !!!"});
            const newSize = new Sizes({Name});
            newSize.save();
            res.status(200).json({msg:"Thêm thành công"});
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
    },
    updateSize: async (req, res)=>{
        try {
            const {Name} = req.body;
            await Sizes.findOneAndUpdate({_id: req.params.id},{Name});
            res.status(200).json({msg:"Cập nhật thành công!!!"});
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
    },
    deleteSize: async(req, res) =>{
        try {
            await Sizes.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Xóa thành công" });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
module.exports = SizeCtrl;