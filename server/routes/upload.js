const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', async (req, res) => {
    try {
        // console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "Không có hình nào tải lên." });
        }
        const file = req.files;
        var result_res = [];
        for (const fi in file) {
            console.log( file[fi] );
            await cloudinary.v2.uploader.upload(file[fi].tempFilePath, { folder: "IMG" }, async (err, result) => {
                if (err) throw err;
                const new_result = { public_id: result.public_id, url: result.url };
                result_res.push(new_result);
                removeTmp(file[fi].tempFilePath);
            })
        }
        await res.json(result_res);
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

router.post('/destroy', async (req, res) => {
    try {
        const img = req.body;
        for (const id in img) {
            await cloudinary.v2.uploader.destroy(img[id].public_id, async (err, result) => {
                if (err) throw err;
            })
        }
        res.json({ msg: "Xóa thành công" })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}
module.exports = router;