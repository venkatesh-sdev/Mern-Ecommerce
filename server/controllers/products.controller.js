import Product from "../models/Products.model.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import catchAsyncError from "../utils/catchAsyncError.js";
import ProductFeatures from '../utils/ProductFeatures.js'

export const getAllProducts = catchAsyncError(async (req, res, next) => {
    // 
    const productFeatures = new ProductFeatures(Product.find({}), req.query).search().filter();
    // Getting All Products from Database
    const products = await productFeatures.products;
    // Sending response as All Products
    return res.status(200).json({ message: "Products Sended", success: true, productsCount: products.length, products })
}
)

export const getSingleProduct = catchAsyncError(async (req, res, next) => {

    // Extracting ID from Request Body
    const id = req.params.id;
    // Getting a  Product from Database
    const product = await Product.findById(id);
    // Check the Products if the product is null send response as no product found
    if (!product) {
        // Passing to next Error Handle Middleware
        return next(new ErrorHandler("Product Not Found", 400));
    }
    // Sending response
    return res.status(200).json({ message: "Product Sended", success: true, product })
}
)

export const deleteProduct = catchAsyncError(async (req, res, next) => {

    // Extracting ID from Request Body
    const id = req.params.id;
    // Getting a  Product from Database
    const product = await Product.findById(id);
    // Check the Products if the product is null send response as no product found
    if (!product) {
        // Passing to next Error Handle Middleware
        return next(new ErrorHandler("Product Not Found", 400));
    }
    // Delete Data from Database
    await Product.findByIdAndDelete(id);
    // Sending response
    return res.status(200).json({ message: "Product Deleted", success: true })

})

export const createNewProduct = catchAsyncError(async (req, res, next) => {

    // Extracting Data from Request Body
    const data = req.body;
    // Creating new Product and Save the product
    const product = await Product.create(data);
    await product.save();
    // Sending Response 
    return res.status(201).json({ message: "Products Created", success: true, data: product })
}
)

export const updateProduct = catchAsyncError(async (req, res, next) => {

    const data = req.body;
    const id = req.params.id;
    // Getting a  Product from Database
    const product = await Product.findById(id);
    console.log(product)
    // Check the Products if the product is null send response as no product found
    if (!product) {
        // Passing to next Error Handle Middleware
        return next(new ErrorHandler("Product Not Found", 400));
    }
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    // Sendinng response
    return res.status(201).json({ message: "Product Updated Succesfully", success: true, product: updatedProduct })
})