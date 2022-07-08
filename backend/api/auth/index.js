import AuthRoute from './Router.js'
import AuthController from './Controller.js'
// import { DataJson } from '../../store/DataJson.js'
import Auth from '../../entity/Auth.js'
import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
// import { DataPostgresql } from '../../store/DbPostgresql.js'
import { DBMongo } from '../../store/DBMongo.js'

export const authModule = (expressRoute) => {
  // const authService = new DataJson()
  // const authService = new DataPostgresql()
  const authService = new DBMongo()
  const authController = new AuthController(authService, Auth, helpers.comparePassword, helpers.generateToken)
  const authRoute = new AuthRoute(expressRoute, authController, response, HttpCode)
  return authRoute._router
}
