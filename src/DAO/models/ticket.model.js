import { Schema, model } from 'mongoose'

const schema = new Schema({
  code: { type: String, unique: true, required: true, default: '' },
  purchase_datetime: { type: String, required: true, default: '' },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }
})

export const ticketModel = model('ticket', schema)
