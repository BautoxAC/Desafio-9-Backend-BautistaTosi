import { CartManagerDBService } from '../services/carts.service.js'
const list = new CartManagerDBService()
export class CartViewController {
  async getCartByIdToView (req, res) {
    const Id = req.params.cid
    const cart = await list.getCartById(Id)
    return res.render('cart', { cart: cart.data.products, total: cart.data.totalPrices })
  }
}
