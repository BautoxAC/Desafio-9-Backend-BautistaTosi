import { CurrentUser } from '../DAO/DTOs/currentUser.dto.js'
export class SessionsController {
  redirectHome (req, res) {
    req.session.user = req.user
    res.redirect('/products')
  }

  seeCurrentSession (req, res) {
    const CurrentUserDTO = new CurrentUser(req.session.user)
    return res.status(200).json({ Session: CurrentUserDTO })
  }
}
