const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const itemModel = require("./models/itemModule");
const items = require("./utils/data");

//config
dotenv.config();
connectDb();

//function seeder
const importData = async ()=>{
    try{
        await itemModel.deleteMany();
        const itemData = await itemModel.insertMany(items);
        console.log("All items added".bgGreen);
        process.exit();
    }catch(error){
        console.log(`${error} while import data in seeder`.bgRed.inverse);
        process.exit(1);
    }
}

importData();