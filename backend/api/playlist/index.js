import express from 'express'
import PlaylistRouter from './Router.js'
import PlaylistController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
import { DataJson } from '../../store/DataJson.js'
import Playlist from '../../entity/Playlist.js'
import { validateCreteUser } from './validate.js'

export const playlistModule = () => {
  const servicePlaylist = new DataJson()
  const playlistController = new PlaylistController(servicePlaylist, Playlist)
  const playlistRouter = new PlaylistRouter(express.Router, playlistController, response, HttpCode, validateCreteUser)
  return playlistRouter._router
}
