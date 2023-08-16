import express from 'express'
import { isUser } from '../middlewares/auth.js'
import { ProductViewController } from '../controller/productView.controller.js'
export const productViewRouter = express.Router()
const ProductViewControllerRouting = new ProductViewController()

productViewRouter.get('/', isUser, ProductViewControllerRouting.renderAllProducts)

productViewRouter.get('/:pid', isUser, ProductViewControllerRouting.renderDetails)
