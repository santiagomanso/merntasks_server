const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected succesfully');
    } catch (error) {
        console.log("Could not connect to database this is the CATCH", error);
        process.exit(1); //stop server
    }
}
module.exports = connectDB;