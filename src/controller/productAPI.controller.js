import { ProductManagerDBService } from '../services/products.service.js'
import { newMessage } from '../utils.js'
import config from './../config/env.config.js'
const { port } = config
const list = new ProductManagerDBService()
export class ProductsAPIController {
  async getProducts (req, res) {
    const { limit, page, query, sort } = req.query
    const url = `http://localhost:${port}/api/products`
    return res.status(200).json(await list.getProducts(limit, page, query, sort, url))
  }

  async getProductById (req, res) {
    const Id = req.params.pid
    return res.status(200).json(newMessage('success', 'producto por id', await list.getProductById(Id)))
  }

  async updateProduct (req, res) {
    const Id = req.params.pid
    const productPropsToUpdate = req.body
    return res.status(200).json(newMessage(await list.updateProduct(Id, productPropsToUpdate)))
  }

  async deleteProduct (req, res) {
    const Id = req.params.pid
    return res.status(200).json(await list.deleteProduct(Id))
  }

  async addImage (req, res) {
    res.redirect('/realtimeproducts')
  }
}
