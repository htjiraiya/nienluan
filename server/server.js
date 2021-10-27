require('dotenv').config();
const express = require('express');
const Upload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { listen } = require('express/lib/application');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(Upload({
    useTempFiles:true
}));

app.use('/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/sizeRoutes'));
app.use('/api', require('./routes/colorRoutes'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRoutes'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
const URI = process.env.MONGOBD_URL;
mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, err => {
    if (err) throw err;
    console.log('MongoDB connect Successful !!!');
});