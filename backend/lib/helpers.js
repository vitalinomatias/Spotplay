// PARA ENCRIPATR LAS PASSWORD
import bcrypt from 'bcrypt'
// import { json } from 'express'
// PARA VALIDAR LOS DATOS
// import { check, validationResult } from 'express-validator'
import expressValidation from 'express-validator'
import { response } from '../response/response.js'

// para autenticacion
import jwt from 'jsonwebtoken'
import { config } from '../config/default.js'

export const helpers = {
  // encripta las password
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },

  // compara las contraseñas
  comparePassword: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  },

  generateToken: (idUser) => {
    return jwt.sign({
      id: idUser
    }, config.jwt.secret, {
      expiresIn: '1h'
    })
  },
  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret)
  },
  validateResult: (req, res, next) => {
    try {
      expressValidation.validationResult(req.throw)
      return next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }

  // valida los datos
  // validation: (validacion, req, res, next) => {
  //   const check = expressValidation.check
  //   const validationResult = expressValidation.validationResult
  //   return validacion [
  //     (req, res, next) => {
  //       try {
  //         validationResult(req).throw()
  //         console.log('log')
  //         console.log(validateCreteUser)
  //         next()
  //       } catch (error) {
  //         console.log('si no funciona')
  //         response.error(req, res, error.array()[0].msg, 400)
  //       }
  //     }]
  // }
}

// valida los datos

// const check = expressValidation.check
// const validationResult = expressValidation.validationResult
// export const validateCreteUser = [
//   check('username')
//     .exists()
//     .isLength({ min: 3 })
//     .withMessage('Name should be atleast 3 characters'),
//   check('email')
//     .exists()
//     .isEmail()
//     .withMessage('Please enter  valid email'),
//   check('password')
//     .exists()
//     .isLength({ min: 6 })
//     .withMessage('Password should be atleast 6 chacarcetrs'),
//   (req, res, next) => {
//     try {
//       validationResult(req).throw()
//       console.log('log')
//       console.log(validateCreteUser)
//       next()
//     } catch (error) {
//       console.log('si no funciona')
//       response.error(req, res, error.array()[0].msg, 400)
//     }
//   }
// ]
