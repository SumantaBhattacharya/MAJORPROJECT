const mongoose = require('mongoose');

// Import the DB_NAME constant from the contants.js file
const DB_NAME = require('../contants.js');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
        console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
        console.log(`Connected to DB: ${mongoose.connection.name}`); // Log the connected DB name
    } catch (err) {
        console.log("MONGODB connection failed", err);
        process.exit(1);
    }
};

// Export the connectDB function
module.exports = connectDB;
