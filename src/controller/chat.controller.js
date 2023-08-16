import { ChatManagerDBService } from '../services/chat.service.js'
const ChatManager = new ChatManagerDBService()
export class ChatController {
  async getMessages (req, res) {
    const user = req.session.user.firstName
    const { data } = await ChatManager.getMessages()
    return res.render('chat', { messages: data.reverse(), user })
  }
}
