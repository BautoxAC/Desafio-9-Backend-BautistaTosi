import express from 'express'
import { CartViewController } from '../controller/cartView.controller.js'
import { isUser, isYourCart } from '../middlewares/auth.js'
export const cartViewRouter = express.Router()
const cartViewControllerRouting = new CartViewController()

cartViewRouter.get('/:cid', isUser, isYourCart, cartViewControllerRouting.getCartByIdToView)
