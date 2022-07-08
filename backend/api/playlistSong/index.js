import express from 'express'
import PlaylistSongRouter from './Router.js'
import PlaylistSongController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpCode.js'
import PlaylistSong from '../../entity/PlaylistSong.js'
import { DBMongo } from '../../store/DBMongo.js'
import { chekToken } from '../secure/secure.js'

export const playlistSongModule = () => {
  const servicesPlaylistSong = new DBMongo()
  const playlistSongController = new PlaylistSongController(servicesPlaylistSong, PlaylistSong)
  const playlistSongRouter = new PlaylistSongRouter(express.Router, playlistSongController, response, HttpCode, chekToken)
  return playlistSongRouter._router
}
