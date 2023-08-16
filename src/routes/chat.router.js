import express from 'express'
import { isNotAdmin, isUser } from './../middlewares/auth.js'
import { ChatController } from '../controller/chat.controller.js'
export const chatRouter = express.Router()
const ChatControllerRouting = new ChatController()
chatRouter.get('/', isNotAdmin, isUser, ChatControllerRouting.getMessages)
