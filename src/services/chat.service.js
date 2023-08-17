import { newMessage } from '../utils/utils.js'
import { ChatManagerDBDAO } from '../DAO/DB/chatManagerDB.dao.js'
import { UserManagerDBDAO } from '../DAO/DB/userManagerDB.dao.js'
import { CustomError } from './errors/custom-error.js'
import { EErros } from './errors/enums.js'
const UserManagerDB = new UserManagerDBDAO()
const ChatManagerDB = new ChatManagerDBDAO()
export class ChatManagerDBService {
  async addMessage (message, userName) {
    try {
      const user = await UserManagerDB.getUserByUserName(userName)
      if (user) {
        const lastAdded = await ChatManagerDB.addMessage(message, userName)
        return newMessage('success', 'Message added successfully', lastAdded)
      } else {
        CustomError.createError({
          name: 'Finding user Error',
          cause: 'the user was not found',
          message: 'Error the message could not be sent the user was not found ',
          code: EErros.INCORRECT_CREDENTIALS_ERROR
        })
        return newMessage('failure', 'The user was not foud', '')
      }
    } catch (e) {
      return newMessage('failure', 'an error ocurred', e)
    }
  }

  async getMessages () {
    try {
      const messages = await ChatManagerDB.getMessages()
      return newMessage('success', 'Messages got', messages)
    } catch (e) {
      return newMessage('failure', 'Messages not found', e)
    }
  }
}
