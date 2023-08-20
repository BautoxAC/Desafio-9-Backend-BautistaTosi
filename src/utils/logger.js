import winston from 'winston'
import config from '../config/env.config.js'
import { __dirname } from './__dirname.js'
const { logWinston } = config
const loggerType = () => {
  if (logWinston === 'development') {
    return new winston.transports.Console({
      level: 'debug',
      format: winston.format.colorize({ all: true })
    })
  }
  return new winston.transports.File({
    filename: __dirname + '/errors.log',
    level: 'info',
    format: winston.format.simple()
  })
}
export const logger = winston.createLogger({
  transports: [
    loggerType()
  ]
})
