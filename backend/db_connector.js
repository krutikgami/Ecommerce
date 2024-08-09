import mongoose from "mongoose";

const connect_db = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
       
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log("Mongodb connection error",err);
    }
}

export default connect_db;