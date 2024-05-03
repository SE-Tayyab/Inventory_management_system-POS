const mongoose = require("mongoose");
require('colors');

const connectDb = async () =>{
    try {
        const uri = process.env.MONGO_URI;
        console.log(`Attempting to connect to MongoDB at ${uri}`.bgYellow);
        
        const conn = await mongoose.connect(uri);

        console.log(`MongoDb connected to ${conn.connection.host}`.bgGreen);
    } catch (err) {
        console.log(`Error while connecting to the database: ${err}`.bgRed); 
        process.exit(1);
    }
}

module.exports = connectDb;
