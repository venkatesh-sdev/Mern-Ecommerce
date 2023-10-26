import { Router } from "express";
import { GetAllProducts, createNewProduct } from '../controllers/products.controller.js'

const router = Router();

// Get All products from server http://localhost:3001/api/products/getAllProducts 
router.get('/getAllProducts', GetAllProducts);

// Create a new Product http://localhost:3001/api/products/createNewProduct
router.post('/createNewProduct', createNewProduct)

export default router;