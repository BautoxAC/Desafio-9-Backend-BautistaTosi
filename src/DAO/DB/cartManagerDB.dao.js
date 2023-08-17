import { cartModel } from '../models/carts.model.js'
import { ticketModel } from '../models/ticket.model.js'
import { v4 as uuidv4 } from 'uuid'
import { EErros } from '../../services/errors/enums.js'
import { CustomError } from '../../services/errors/custom-error.js'
import { formattedDate } from '../../utils/utils.js'
export class CartManagerDBDAO {
  async getCartById (id) {
    try {
      const cartFindId = await cartModel.findOne({ _id: id }).populate('products.idProduct').lean()
      return cartFindId
    } catch (e) {
      CustomError.createError({
        name: 'Finding cart Error',
        cause: 'Failed to find the cart in DAO (check the data)',
        message: 'Error to find the cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async addCart () {
    try {
      const lastAdded = await cartModel.create({ products: [] })
      return lastAdded
    } catch (e) {
      CustomError.createError({
        name: 'Creating cart Error',
        cause: 'Failed to add a cart in DAO (check the DB)',
        message: 'Error to create the cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async addProduct (cart) {
    try {
      await cartModel.updateOne({ _id: cart._id }, cart)
      return cart
    } catch (e) {
      CustomError.createError({
        name: 'Updating cart Error',
        cause: 'Failed to add a product to cart in DAO (check the data)',
        message: 'Error to update the cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async deleteProduct (cartFindId) {
    try {
      await cartModel.updateOne({ _id: cartFindId._id }, cartFindId)
      return cartFindId
    } catch (e) {
      CustomError.createError({
        name: 'Deleting cart Error',
        cause: 'Failed to delete a cart in DAO (check the data)',
        message: 'Error to delete a product the cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async addNewProducts (cartFindId) {
    try {
      await cartModel.updateOne({ _id: cartFindId._id }, cartFindId)
      return cartFindId
    } catch (e) {
      CustomError.createError({
        name: 'Adding an array to the cart Error',
        cause: 'Failed to add an array of products in DAO(check the data)',
        message: 'Error to add an array of products to the cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async deleteAllProducts (cartFindId) {
    try {
      await cartModel.updateOne({ _id: cartFindId._id }, cartFindId)
      return cartFindId
    } catch (e) {
      CustomError.createError({
        name: 'Emptying the cart Error',
        cause: 'Failed to empty the cart in DAO (check the data)',
        message: 'Error to delete all products of the cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async updateQuantityProduct (cartFindId) {
    try {
      await cartModel.updateOne({ _id: cartFindId._id }, cartFindId)
      return cartFindId
    } catch (e) {
      CustomError.createError({
        name: 'Updating the quantity Error',
        cause: 'Failed to update the quantity of products in a cart in DAO (check the data)',
        message: 'Error to update the quantity of a product',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async createATicketToBuy (purchaser, amount) {
    try {
      const newTicket = await ticketModel.create({ code: uuidv4(), purchase_datetime: formattedDate, purchaser, amount })
      return newTicket
    } catch (e) {
      CustomError.createError({
        name: 'Ticket Error',
        cause: 'Failed to create the ticket in a cart in DAO (check the data)',
        message: 'Error to create the ticket of a cart',
        code: EErros.DATABASES_ERROR
      })
    }
  }
}
