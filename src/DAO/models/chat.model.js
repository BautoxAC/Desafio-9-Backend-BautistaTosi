import { Schema, model } from 'mongoose'

const schema = new Schema({
  message: { type: String, required: true, max: 250 },
  user: { type: String, required: true, unique: false, max: 65 }
})

export const chatModel = model('chat', schema)
