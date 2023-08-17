import { UserManagerDBDAO } from '../DAO/DB/userManagerDB.dao.js'
import { newMessage } from '../utils/utils.js'
const UserManagerDB = new UserManagerDBDAO()
export class UserManagerDBService {
  async addUsser (userPassword, userName) {
    try {
      const user = UserManagerDB.addUsser(userPassword, userName)
      return newMessage('success', 'user Created successfully', user)
    } catch (e) {
      return newMessage('failure', 'Failed to create a user', e)
    }
  }

  async getUserByUserName (userName) {
    try {
      const user = await UserManagerDB.getUserByUserName(userName)
      return newMessage('success', 'user Found successfully', user)
    } catch (e) {
      return newMessage('failure', 'Failed to find a user', e)
    }
  }
}
