import { Productmodel } from '../models/products.model.js'
import { EErros } from '../../services/errors/enums.js'
import { CustomError } from '../../services/errors/custom-error.js'
export class ProductManagerDBDAO {
  async addProduct (product) {
    try {
      await Productmodel.create(product)
      const lastAdded = await Productmodel.findOne({}).sort({ _id: -1 }).lean()
      return lastAdded
    } catch (e) {
      CustomError.createError({
        name: 'Creating a product Error',
        cause: 'Failed to create a product in DAO (check the data)',
        message: 'Error to create a product',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async updateProduct (productToUpdate) {
    try {
      await Productmodel.updateOne({ _id: productToUpdate._id.toString() }, productToUpdate)
      return productToUpdate
    } catch (e) {
      CustomError.createError({
        name: 'Updating a product Error',
        cause: 'Failed to update a product in DAO (check the data)',
        message: 'Error to update a product',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async getProducts (limit, page, query, sort) {
    try {
      const { docs, ...rest } = await Productmodel.paginate({ [query && 'category']: query }, { limit: limit || 10, page: page || 1, sort: { price: sort || null }, lean: true })
      return { docs, rest }
    } catch (e) {
      CustomError.createError({
        name: 'Getting products Error',
        cause: 'Failed to get products in DAO (check the data)',
        message: 'Error to get the products',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async getProductById (id) {
    try {
      const productFindId = await Productmodel.findOne({ _id: id }).lean()
      return productFindId
    } catch (e) {
      CustomError.createError({
        name: 'Getting product by id Error',
        cause: 'Failed to get product by id in DAO (check the data)',
        message: 'Error to get the product by id',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async deleteProduct (id) {
    try {
      const productToDelete = await Productmodel.deleteOne({ _id: id })
      return productToDelete
    } catch (e) {
      CustomError.createError({
        name: 'Deleting a product Error',
        cause: 'Failed to delete a product in DAO (check the data)',
        message: 'Error to delete a product',
        code: EErros.DATABASES_ERROR
      })
    }
  }
}
