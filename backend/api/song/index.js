import express from 'express'
import SongRouter from './Router.js'
import SongController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
// import { DataJson } from '../../store/DataJson.js'
import Song from '../../entity/Song.js'
import { validateCreteUser } from './validate.js'

// import { DataPostgresql } from '../../store/DbPostgresql.js'
import { DBMongo } from '../../store/DBMongo.js'

import { chekToken, chekRole } from '../secure/secure.js'

export const songModule = () => {
  // const servicesSong = new DataJson()
  // const servicesSong = new DataPostgresql()
  const servicesSong = new DBMongo()
  const songController = new SongController(servicesSong, Song)
  const songRouter = new SongRouter(express.Router, songController, response, HttpCode, validateCreteUser, chekToken, chekRole)
  return songRouter._router
}
