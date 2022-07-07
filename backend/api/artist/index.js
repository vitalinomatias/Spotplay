import express from 'express'
import ArtistRouter from './Router.js'
import ArtistController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
// import { DataJson } from '../../store/DataJson.js'
import Artist from '../../entity/Artist.js'
import { validateCreteUser } from './validate.js'
import { DataPostgresql } from '../../store/DbPostgresql.js'

export const artistModule = () => {
  // const serviceArtist = new DataJson()
  const serviceArtist = new DataPostgresql()
  const artistController = new ArtistController(serviceArtist, Artist)
  const artistRouter = new ArtistRouter(express.Router, artistController, response, HttpCode, validateCreteUser)
  return artistRouter._router
}
