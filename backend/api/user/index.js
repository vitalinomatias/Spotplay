// import express from 'express'
import UserRouter from './Router.js'
import UserController from './Controller.js'
// import { DataJson } from '../../store/DataJson.js'
import User from '../../entity/User.js'
import { helpers } from '../../lib/helpers.js'
import { HttpCode } from '../../response/httpCode.js'
import { response } from '../../response/response.js'
import { validateCreteUser } from './validate.js'
// import UserValidation from './validate.js'

import { DataPostgresql } from '../../store/DbPostgresql.js'

export const userModule = (expressRouter) => {
  // const userServices = new DataJson()
  const userServices = new DataPostgresql()
  const userController = new UserController(userServices, User, helpers.encryptPassword)
  const userRouter = new UserRouter(expressRouter, userController, response, HttpCode, validateCreteUser)
  return userRouter._router
}
