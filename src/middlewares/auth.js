import { newMessage } from '../utils/utils.js'
export function isUser (req, res, next) {
  if (req.session?.user?.email) {
    return next()
  }
  return res.status(401).render('error', { error: 'error de autenticacion!' })
}

export function isAdmin (req, res, next) {
  if (req.session?.user?.role === 'Admin') {
    return next()
  }
  return res.status(403).render('error', { error: 'error de autorización!' })
}

export function AdminCredentials (req, res, next) {
  const { email, password } = req.body
  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    req.session.user = { email, role: 'Admin' }
    return res.redirect('/products')
  }
  return next()
}

export function isNotAdmin (req, res, next) {
  if (req.session?.user?.role === 'Admin') {
    return res.status(403).render('error', { error: 'error de autorización!' })
  }
  return next()
}

export async function isYourCart (req, res, next) {
  try {
    const Id = req.params.cid
    if (req.session?.user?.cart === Id) {
      return next()
    } else {
      return res.status(403).render('error', { error: 'error de autorización! Este no es tu carrito' })
    }
  } catch (e) {
    return newMessage('failure', 'Failed to identify if this cart is yours', e)
  }
}
