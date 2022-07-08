import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'

export const chekToken = async (req, res, next) => {
  const token = req.headers['x-acces-token'] || req.headers['authorization'] || ''
  if (token) {
    try {
      const verify = await helpers.verifyToken(token)
      if (verify) {
        // const idUser = verify.idUser  // esto pdria servir para los roles y se verifica en la bd que tipo de idRole tiene
        // const idRol = verify.role
        // console.log('token valido')
        // if (idRol === '1') {
        //   next()
        // }
        // if (idRol === '2') {
        //   return response.error(req, res, 'no autorizado', HttpCode.UNAUTHORIZED)
        // }
        next()
      } else {
        return response.error(req, res, 'token invalid', HttpCode.UNAUTHORIZED)
      }
    } catch (error) {
      return response.error(req, res, 'token invalid', HttpCode.UNAUTHORIZED)
    }
  } else {
    return response.error(req, res, 'token invalid', HttpCode.UNAUTHORIZED)
  }
}

export const chekRole = async (req, res, next) => {
  const token = req.headers['x-acces-token'] || req.headers['authorization'] || ''
  if (token) {
    try {
      const verify = await helpers.verifyToken(token)
      if (verify) {
        const idRol = verify.role
        console.log('token valido')
        if (idRol === '1') {
          next()
        }
        if (idRol === '2') {
          return response.error(req, res, 'no autorizado', HttpCode.UNAUTHORIZED)
        }
      } else {
        return response.error(req, res, 'token invalid', HttpCode.UNAUTHORIZED)
      }
    } catch (error) {
      return response.error(req, res, 'token invalid', HttpCode.UNAUTHORIZED)
    }
  } else {
    return response.error(req, res, 'token invalid', HttpCode.UNAUTHORIZED)
  }
}
