import express from 'express'
import { isUser, isAdmin, AdminCredentials } from '../middlewares/auth.js'
import passport from 'passport'
import { AuthController } from '../controller/auth.controller.js'
export const authRouter = express.Router()
const authControllerRouting = new AuthController()
authRouter.get('/login', authControllerRouting.renderLogin)

authRouter.post('/login', AdminCredentials, passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authControllerRouting.logUser)

authRouter.get('/faillogin', authControllerRouting.loginFail)

authRouter.get('/logout', authControllerRouting.logOut)

authRouter.get('/register', authControllerRouting.renderRegister)

authRouter.post('/register', AdminCredentials, passport.authenticate('register', { failureRedirect: '/auth/failregister' }), authControllerRouting.registerUser)

authRouter.get('/failregister', authControllerRouting.registerFail)

authRouter.get('/perfil', isUser, authControllerRouting.getPerfil)

authRouter.get('/administracion', isUser, isAdmin, authControllerRouting.getSecret)
