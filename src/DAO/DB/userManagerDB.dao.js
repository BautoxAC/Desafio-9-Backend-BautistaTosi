import { userModel } from '../models/users.model.js'
import { EErros } from '../../services/errors/enums.js'
import { CustomError } from '../../services/errors/custom-error.js'
export class UserManagerDBDAO {
  async addUsser (userPassword, userName) {
    try {
      await userModel.create({ userPassword, userName })
      const lastAdded = await userModel.findOne({}).sort({ _id: -1 }).lean()
      return lastAdded
    } catch (e) {
      CustomError.createError({
        name: 'Creating a user Error',
        cause: 'Failed to create a user in DAO (check the data)',
        message: 'Error to create a user',
        code: EErros.DATABASES_ERROR
      })
    }
  }

  async getUserByUserName (userName) {
    try {
      const user = await userModel.findOne({ email: userName }).lean()
      return user
    } catch (e) {
      CustomError.createError({
        name: 'Getting a user by userName Error',
        cause: 'Failed to find the User in DAO (check the data)',
        message: 'Error to get a user by userName',
        code: EErros.DATABASES_ERROR
      })
    }
  }
}
