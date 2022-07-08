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

export const genreModule = () => {
  // const serviceGenre = new DataJson()
  // const serviceGenre = new DataPostgresql()
  const serviceGenre = new DBMongo()
  const genreController = new GenreController(serviceGenre, Genre)
  const genreRouter = new GenreRouter(express.Router, genreController, response, HttpCode, validateCreteUser)
  return genreRouter._router
}
