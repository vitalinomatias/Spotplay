// usndo express validator

import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreteUser = [
  check('username')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Name should be atleast 3 characters'),
  check('name')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Name should be atleast 3 characters'),
  check('email')
    .exists()
    .isEmail()
    .withMessage('Please enter  valid email'),
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password should be atleast 6 chacarcetrs'),
  check('avatar')
    .exists()
    .not()
    .isEmpty()
    .isURL()
    .withMessage('la uri es incorrecta'),
  check('idRole')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe existir un role'),
  check('idAccount')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Se debe especificar un tipo de cuenta'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]

// import { check } from 'express-validator'
// class UserValidation {
//   constructor (helpers) {
//     // this._check = helpers.check
//     this._validdateResult = helpers
//     this.validateCreateUser()
//   }

//   validateCreateUser () {
//     // const validate = this._validdateResult(req, res, next)
//     const validateCreteUser = [
//       check('username')
//         .exists()
//         .isLength({ min: 3 })
//         .withMessage('Name should be atleast 3 characters'),
//       check('email')
//         .exists()
//         .isEmail()
//         .withMessage('Please enter  valid email'),
//       check('password')
//         .exists()
//         .isLength({ min: 6 })
//         .withMessage('Password should be atleast 6 chacarcetrs'),
//       (req, res, next) => {
//         this._validdateResult()
//       }
//     ]

//     return validateCreteUser
//   }
// }

// export default UserValidation
