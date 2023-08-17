import express from 'express'
import { uploader } from '../utils/utils.js'
import { ProductsAPIController } from '../controller/productAPI.controller.js'
import { isAdmin } from '../middlewares/auth.js'
const ProductsAPIControllerRouting = new ProductsAPIController()
export const productsAPIRouter = express.Router()

productsAPIRouter.get('/', ProductsAPIControllerRouting.getProducts)

productsAPIRouter.get('/:pid', ProductsAPIControllerRouting.getProductById)

productsAPIRouter.put('/:pid', isAdmin, ProductsAPIControllerRouting.updateProduct)

productsAPIRouter.delete('/:pid', isAdmin, ProductsAPIControllerRouting.deleteProduct)

productsAPIRouter.post('/', isAdmin, uploader.single('file'), ProductsAPIControllerRouting.addImage)
