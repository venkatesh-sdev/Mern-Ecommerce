import productsData from '../public/data/products.json' assert { type: "json" };
import Product from '../models/Products.model.js';
import dotenv from 'dotenv';

import DBConnection from './DbConnection.js';

// Environment configuration
dotenv.config()

// Database connection
DBConnection();

const seedProducts = async () => {
    try {
        // Delete Products All Datas from the DB
        await Product.deleteMany();
        console.log("Products Deleted")
        // Insert All datas to the Database
        await Product.insertMany(productsData)
        console.log("Products Added Successfully");
    } catch (error) {
        console.log(error.message)
    }
    process.exit();
}

seedProducts();
