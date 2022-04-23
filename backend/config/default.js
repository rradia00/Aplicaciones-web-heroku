const enlace = require("../config/default.json");
const mongoose = require('mongoose');
const db=process.env.MONGODB_URI || enlace.get("mongoURI");
const connectDB=async ()=>{
  try{
    await mongoose.connect(db, {
      useNewURLParser:true,
      useUnifiedTopology:true,
    });
    console.log("Mongodb connected");
  }catch(e){
    console.error(e.message);
    process.exit(1);
  }
};
module.exports = connectDB; 
