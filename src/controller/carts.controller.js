import { CartManagerDBService } from '../services/carts.service.js'
import { newMessage } from '../utils.js'
const list = new CartManagerDBService()
export class CartsController {
  async getCartById (req, res) {
    const Id = req.params.cid
    return res.status(200).json(newMessage('success', 'carrito por id', await list.getCartById(Id)))
  }

  async addCart (req, res) {
    return res.status(200).json(await list.addCart())
  }

  async addProduct (req, res) {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    return res.status(200).json(await list.addProduct(idCart, idProduct))
  }

  async deleteProduct (req, res) {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    return res.status(200).json(await list.deleteProduct(idCart, idProduct))
  }

  async deleteAllProducts (req, res) {
    const idCart = req.params.cid
    return res.status(200).json(await list.deleteAllProducts(idCart))
  }

  async addNewProducts (req, res) {
    const idCart = req.params.cid
    const products = req.body
    return res.status(200).json(await list.addNewProducts(idCart, products))
  }

  async updateQuantityProduct (req, res) {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const quantity = req.body
    return res.status(200).json(await list.updateQuantityProduct(idCart, idProduct, quantity))
  }

  async createATicketToBuy (req, res) {
    const idCart = req.session.user.cart
    const purchaser = req.session.user.email
    return res.status(200).json(await list.createATicketToBuy(idCart, purchaser))
  }
}
