import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Environtment variables configuration;
dotenv.config();

// MongoDb Connection with Cluster
const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("Database Connected Sucessfull!!!");
    } catch (error) {
        console.log(error)
    }
}


// Creating express instance
const app = express();


// Getting Environment variable
const PORT = process.env.PORT || 4001;

// Create and Listen a sever at http://localhost:3001
app.listen(PORT, () => {
    console.log("Server Running at http://localhost:" + PORT);
});


export default app;


