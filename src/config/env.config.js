import { Command } from 'commander'
import dotenv from 'dotenv'
const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'DEVELOPMENT')
program.parse()

dotenv.config({
  path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production'
})

export default {
  mongoUrl: process.env.MONGO_LINK,
  sessionSecret: process.env.SESSION_SECRET,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: process.env.PORT
}
