import express from 'express'
import { MockingProductsController } from '../controller/mockingProducts.controller.js'
export const mockingProducts = express.Router()
const MockingProductManager = new MockingProductsController()
mockingProducts.get('/', MockingProductManager.createMockProducts)
