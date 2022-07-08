import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

// configuracion de paths
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// importacion de modulos
import { songModule } from './song/index.js'
import { artistModule } from './artist/index.js'
import { genreModule } from './genre/index.js'
import { playlistModule } from './playlist/index.js'
import { userModule } from './user/index.js'
import { authModule } from './auth/index.js'
import { playlistSongModule } from './playlistSong/index.js'

// esta clase crea el servidor
class Server {
  constructor (config) {
    this._app = express() // almacena la instancia de express
    this._port = config.port // almacena el puerto del servidor
    this._hostname = config.hostname // almacena el hostname del servidor
    this._name = config.name // almacena el nombre del servidor
    this._dirname = dirname(fileURLToPath(import.meta.url)) // almacena el directorio del servidor
    this._swaggerFile = YAML.load(join(dirname(fileURLToPath(import.meta.url)), '../docs/swagger.yaml'))
    this.setMiddlewares()
    this.setRoutes()
  }

  setMiddlewares () {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  // se configuran las rutas raices
  setRoutes () {
    this._app.use('/api/v1/song', songModule())
    this._app.use('/api/v1/artist', artistModule())
    this._app.use('/api/v1/genre', genreModule())
    this._app.use('/api/v1/playlist', playlistModule())
    this._app.use('/api/v1/user', userModule(express.Router))
    this._app.use('/api/v1/auth', authModule(express.Router))
    this._app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(this._swaggerFile))
    this._app.use('/api/v1/playlistsong', playlistSongModule(express.Router))
  }

  // este metodo inicia el servidor

  start () {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running on http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server
