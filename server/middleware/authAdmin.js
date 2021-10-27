const Users = require('../models/userModel');

const authAdmin = async (req, res, next) =>{
    try {
        // Lấy thông tin id 
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.Role === 0)
            return res.status(400).json({msg: "Quyền truy cập không phải quản trị viên"})
        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin;