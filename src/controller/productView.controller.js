import { ProductManagerDBService } from '../services/products.service.js'
import config from './../config/env.config.js'
const { port } = config
const list = new ProductManagerDBService()
export class ProductViewController {
  async renderAllProducts (req, res) {
    const url = `http://localhost:${port}/api/products`
    const { limit, page, query, sort } = req.query
    const { email, role, cart } = req.session.user
    const isAdmin = role === 'Admin'
    const pageInfo = await list.getProducts(limit, page, query, sort, url)
    return res.status(200).render('products', { ...pageInfo, email, isAdmin, urlCart: `http://localhost:${port}/carts/${cart}` })
  }

  async renderDetails (req, res) {
    const productId = req.params.pid
    const detailsProduct = await list.getProductById(productId)
    return res.status(200).render('details', { detailsProduct: detailsProduct.data })
  }
}
