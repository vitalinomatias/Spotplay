import express from 'express'
import GenreRouter from './Router.js'
import GenreController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
// import { DataJson } from '../../store/DataJson.js'
import Genre from '../../entity/Genre.js'
import { validateCreteUser } from './validate.js'
// import { DataPostgresql } from '../../store/DbPostgresql.js'
import { DBMongo } from '../../store/DBMongo.js'

import { chekToken, chekRole } from '../secure/secure.js'

export const genreModule = () => {
  // const serviceGenre = new DataJson()
  // const serviceGenre = new DataPostgresql()
  const serviceGenre = new DBMongo()
  const genreController = new GenreController(serviceGenre, Genre)
  const genreRouter = new GenreRouter(express.Router, genreController, response, HttpCode, validateCreteUser, chekToken, chekRole)
  return genreRouter._router
}
