import mongoose from "mongoose"

const mongo_uri = process.env.MONGO_URI 
export const ConnectDb = async ()=>{
    await mongoose.connect(mongo_uri);
    console.log("DB connected successully")
}