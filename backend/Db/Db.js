const mongoose = require('mongoose');

//connect to mongodb
const connectDB = async (url) => {

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB...'));


}

module.exports = connectDB;