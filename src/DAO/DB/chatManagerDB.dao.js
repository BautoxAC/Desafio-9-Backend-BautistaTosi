import { chatModel } from '../models/chat.model.js'
import { EErros } from '../../services/errors/enums.js'
import { CustomError } from '../../services/errors/custom-error.js'
export class ChatManagerDBDAO {
  async addMessage (message, userName) {
    try {
      await chatModel.create({ message, user: userName })
      const lastAdded = await chatModel.findOne({}).sort({ _id: -1 }).lean()
      return lastAdded
    } catch (e) {
      CustomError.createError({
        name: 'Adding message Error',
        cause: 'Failed to create a message in DAO (check the data)',
        message: 'Error to add a message',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async getMessages () {
    try {
      const messages = await chatModel.find({}).lean()
      return messages
    } catch (e) {
      CustomError.createError({
        name: 'Getting messages Error',
        cause: 'Failed to get the messages',
        message: 'Error to get the messages',
        code: EErros.DATABASES_ERROR
      })
    }
  }
}
