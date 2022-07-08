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

// envio de correo
import nodemailer from 'nodemailer'

export const helpers = {
  // encripta las password
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },

  // compara las contraseñas
  comparePassword: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  },

  generateToken: (idUser, idRole) => {
    return jwt.sign({
      id: idUser,
      role: idRole
    }, config.jwt.secret, {
      // expiresIn: '5Minutes'
      expiresIn: '10Minutes'
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
}

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'vitalino.1990@gmail.com',
    pass: config.mail.pass
  }
})

transporter.verify().then(() => {
  console.log('Listo para enviar correos')
})
