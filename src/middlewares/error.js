import { EErros } from '../services/errors/enums.js'

export function errorHandler (error, req, res, next) {
  console.log(error.cause)
  /* hacer los casos */
  switch (error.code) {
    case EErros.INVALID_TYPES_ERROR:
      res
        .status(422)
        .send({ status: 'error', error: error.name, cause: error.cause })
      break
    case EErros.DATABASES_ERROR:
      res
        .status(500)
        .send({ status: 'error', error: error.name, cause: error.cause })
      break
    case EErros.INCORRECT_CREDENTIALS_ERROR:
      res
        .status(417)
        .send({ status: 'error', error: error.name, cause: error.cause })
      break
    case EErros.ROUTING_ERROR:
      res
        .status(404)
        .send({ status: 'error', error: error.name, cause: error.cause })
      break
    default:
      res.send({ status: 'error', error: 'Unhandled error' })
      break
  }
}
