import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreteUser = [
  check('name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir un nombre'),
  check('image')
    .exists()
    .not()
    .isEmpty()
    .isURL()
    .withMessage('la uri es incorrecta'),
  check('idUser')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe pertenecer a un usuario'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
