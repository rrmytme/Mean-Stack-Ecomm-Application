const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
// This code connects to a MongoDB database using Mongoose and logs the connection status.
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((con) => {
        console.log(`MongoDB connected: ${con.connection.host}`);
    })
};

module.exports = connectDatabase;