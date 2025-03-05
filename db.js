const mongoose = require("mongoose")
require('dotenv').config();

const connectTodb =  async() => {
    
    try {
        
        await mongoose.connect(process.env.DATABASE_URL); // connect to the database 
        console.log("Database Connected successfully...")

    } catch (error) {
        console.log("Database connection error" , error);
        throw new error("Database connection failed");
    }


}

module.exports = connectTodb 