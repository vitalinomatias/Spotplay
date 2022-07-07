import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreteUser = [
  check('title')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir un nombre'),
  check('uri')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir una diireccion '),
  check('image')
    .exists()
    .not()
    .isEmpty()
    .withMessage('debe existir una diireccion '),
  check('idArtist')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe existir un Artitista'),
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
