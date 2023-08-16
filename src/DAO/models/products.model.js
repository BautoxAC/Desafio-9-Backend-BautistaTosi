import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const schema = new Schema({
  title: { type: String, required: true, max: 100, index: true },
  description: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: Array, default: [], required: true },
  status: { type: Boolean, default: true, required: true },
  category: { type: String, required: true, max: 100, index: true }
})
schema.plugin(mongoosePaginate)
export const Productmodel = model('products', schema)
