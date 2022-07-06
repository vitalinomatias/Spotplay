import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreteUser = [
  check('name')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('el nombre del artista debe tener mas de 5 caracteres'),
  check('avatar')
    .exists()
    .not()
    .isEmpty()
    .isURL()
    .withMessage('la uri de la imagen es incorrecta'),
  check('idGenre')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe existir un Genero'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
