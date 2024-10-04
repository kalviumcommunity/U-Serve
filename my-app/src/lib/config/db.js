import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config(); 
const uri = process.env.MONGO_URI; 
let client;
let db;

export const ConnectDb = async () => {
    if (db) return db;
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("your_database_name");
        return db;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};
