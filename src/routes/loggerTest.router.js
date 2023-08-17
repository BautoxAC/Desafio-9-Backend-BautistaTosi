import express from 'express'
import { logger } from '../utils/logger.js'
export const loggerTestRouter = express.Router()

loggerTestRouter.get('/', (req, res) => {
  logger.debug('This is a debug message')
  logger.info('This is an info message')
  logger.warn('This is a warn message')
  logger.error('This is an error message')
  return res.send('Logger Test Done. Check your Server Console!')
}
)
