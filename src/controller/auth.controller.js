export class AuthController {
  renderLogin (req, res) {
    return res.render('login', {})
  }

  logUser (req, res) {
    if (!req.user) {
      return res.json({ error: 'invalid credentials' })
    }
    req.session.user = {
      _id: req.user?._id,
      email: req.user.email,
      firstName: req.user?.firstName,
      lastName: req.user?.lastName,
      role: req.user.role,
      age: req.user?.age,
      cart: req.user.cart
    }
    return res.redirect('/products')
  }

  loginFail (req, res) {
    return res.json({ error: 'fail to login' })
  }

  logOut (req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { error: 'no se pudo cerrar su session' })
      }
      return res.redirect('/auth/login')
    })
  }

  renderRegister (req, res) {
    return res.render('register', {})
  }

  registerUser (req, res) {
    if (!req.user) {
      return res.json({ error: 'something went wrong' })
    }
    req.session.user = {
      _id: req.user._id,
      age: req.user.age,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      cart: req.user.cart
    }
    return res.redirect('/products')
  }

  registerFail (req, res) {
    return res.json({ error: 'fail to register' })
  }

  getPerfil (req, res) {
    const user = req.user
    return res.json({ perfil: user })
  }

  getSecret (req, res) {
    return res.send('datos super secretos clasificados sobre los perfiles registrados de la pagina')
  }
}
