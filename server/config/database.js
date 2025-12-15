const mongoose = require('mongoose');
require('dotenv').config();

exports.connect =() => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then (()=> console.log("Database Connected Successfully"))
    .catch((err) => {
    console.error(err);
        console.log("Database Connection Failed");
        process.exit(1)
    })
}