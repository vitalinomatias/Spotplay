class PlaylistSongRouter {
  constructor (router, controller, response, httpCode, checkToken) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkToken = checkToken
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkToken, this.handlePostSong.bind(this))
    this._router.delete('/', this._checkToken, this.handleDeleteSong.bind(this))
    this._router.get('/', this._checkToken, this.handleGetSong.bind(this))
  }

  async handlePostSong (req, res) {
    try {
      const playlistSong = req.body
      const result = await this._ctrl.createNewPlaylistSong(playlistSong)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleDeleteSong (req, res) {
    try {
      const playlistSong = req.body
      const result = await this._ctrl.deleteSong(playlistSong._id)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetSong (req, res) {
    if (Object.keys(req.query).length > 0) {
      try {
        const result = await this._ctrl.getOneSong('_title', req.query._title)
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        const result = await this._ctrl.getAllSong()
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    }
  }
}

export default PlaylistSongRouter
