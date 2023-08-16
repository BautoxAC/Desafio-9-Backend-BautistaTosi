import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  quantity: { type: Number }
})
const schema = new Schema({
  products: { type: [productSchema], default: [] }
})

export const cartModel = model('carts', schema)
