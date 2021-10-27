const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userCtrl = {
    register: async(req, res) => {
        try {
            const { Fullname, Email, Password, PasswordConfirm, Phone, Role} = req.body;

            const user = await Users.findOne({ Email })
            if (user) return res.status(400).json({ msg: "Email đã được đăng ký trước đó !!!" })

            if (Password.length < 8) return res.status(400).json({ msg: "Mật khẩu phải đủ 8 ký tự !!!" })

            if (Password !== PasswordConfirm) return res.status(400).json({ msg: "Mật khẩu không trùng khớp !!!" })
            // Mã hóa mật khẩu
            const PasswordHash = await bcrypt.hash(Password, 10);

            const newUser = new Users({
                Fullname,
                Email,
                Password: PasswordHash,
                Phone,
                Role
            })
            // Lưu dữ liệu vào DB
            await newUser.save();

            res.status(200).json({ msg: "Đăng ký thành công!!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res) =>{
        try {
            const {  Email, Password } = req.body;
            // Kiểm tra Email nhập vào đã có đăng kí chưa 
            const user = await Users.findOne({ Email });
            if(!user) return res.status(400).json({ msg: "Email không tồn tại " });
            // Nếu có Email thì kiểm tra mật khẩu có giống với DB chưa 
            const isPassword = await bcrypt.compare(Password, user.Password)
            if(!isPassword) return res.status(400).json({ msg: "Sai mật khẩu " });
            // Nếu thành công, sẽ tại access token và refresh token
            // res.status(200).json({msg:"Đăng nhập thành công !"})

            const accesstoken = createAccessToken({id: user._id})

            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            
            res.json({accesstoken,refreshtoken,Role: user.Role});


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    logout: async (req, res) =>{
        try {
           res.clearCookie('refreshtoken', { path: '/user/refresh_token'})
           return res.json({msg:"Đăng xuất thành công"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(401).json({msg: "Vui lòng đăng nhập hoặc đăng ký!!!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(401).json({msg: "Vui lòng đăng nhập hoặc đăng ký!!!"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req,res) => {
        try {
            const user = await Users.findById(req.user.id).select('-Password -createdAt -updatedAt -__v')
                .populate({
                    path: 'Cart',
                    populate: { path: 'Product_id', select: '-createdAt -updatedAt -__v' }
                })
             if(!user) return res.status(400).json({msg: "User không tồn tại"});
             res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOneUser: async (req,res) => {
        try {
            const user = await Users.findById(req.params.id).select('-Password -createdAt -updatedAt -__v');
             if(!user) return res.status(400).json({msg: "User không tồn tại"})
             res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    editUser: async (req,res) => {
        try {
        await Users.findOneAndUpdate({ _id: req.body._id }, req.body);
        return res.status(200).json({msg: "Cập nhật thành công"})
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    loaduser: async (req,res) => {
        try {
            const user = await Users.find({Role: req.params.Role});
            if(!user) return res.status(400).json({msg: "Lỗi hệ thống !!!"});
            res.status(200).json({user});
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findByIdAndDelete(req.params.id);
            res.json({msg: "Xóa thành công"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addcart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if(!user) return res.status(400).json({msg: "Người dùng không tồn tại"});
            await Users.findOneAndUpdate({_id: req.user.id}, {
                Cart: req.body
            })
            return res.json({msg: "Đã thêm vào giỏ hàng"})
        } catch(err) {
            return res.status(500).json({ msg: err.message})
        }
    }
    // oneuser: async (req,res) => {
    //     try {
    //         const user = await Users.findOne({_id: req.params._id});
    //         res.status(200).json({user});
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },

}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = userCtrl;