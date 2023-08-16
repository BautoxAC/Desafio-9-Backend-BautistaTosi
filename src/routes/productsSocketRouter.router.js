import express from 'express'
import { ProductManagerDBService } from '../services/products.service.js'
export const productsSocketRouter = express.Router()
productsSocketRouter.get('/', async function (req, res) {
  const list = new ProductManagerDBService()
  const products = await list.getProducts()
  return res.status(200).render('realTimeProducts', { products })
})
