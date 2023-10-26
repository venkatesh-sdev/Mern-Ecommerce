import Product from "../models/Products.model.js"

export const GetAllProducts = async (req, res) => {
    try {
        res.json({ message: "Products Sended", success: true })
    } catch (error) {
        console.log(error)
    }
}

export const createNewProduct = async (req, res) => {
    try {
        // Extracting Data from Request Body
        const data = req.body;
        // Creating new Product and Save the product
        const product = await Product.create(data);
        await product.save();
        // Sending Response 
        res.status(201).json({ message: "Products Created", success: true, data: product })
    } catch (error) {
        console.log(error)
    }
}