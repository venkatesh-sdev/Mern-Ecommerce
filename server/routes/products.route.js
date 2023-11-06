import { Router } from "express";
import { getAllProducts, createNewProduct, getSingleProduct, deleteProduct, updateProduct } from '../controllers/products.controller.js'

const router = Router();

// Create a new Product http://localhost:3001/products/createNewProduct
router.post('/createNewProduct', createNewProduct)

// Get All products from server http://localhost:3001/products/getAllProducts 
router.get('/getAllProducts', getAllProducts);

// Get Single products from server http://localhost:3001/products/:id 
router.get('/:id', getSingleProduct);

// Get Single Product and Update the product http://localhost:3001/products/:id
router.put('/:id', updateProduct);

// Get Delete products from server http://localhost:3001/products/:id 
router.delete('/:id', deleteProduct);


export default router;