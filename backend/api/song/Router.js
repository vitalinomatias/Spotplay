class SongRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkSong = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkSong, this.handlePostSong.bind(this))
    this._router.put('/', this.handlePutSong.bind(this))
    this._router.delete('/', this.handleDeleteSong.bind(this))
    this._router.get('/', this.handleGetSong.bind(this))
    // this._router.get('/id', this.handleGetOneSong.bind(this))
    // this._router.get('/idGenre', this.handleGetGenre.bind(this))
    // this._router.get('/idArtist', this.handleGetArtist.bind(this))
  }

  async handlePostSong (req, res) {
    try {
      const song = req.body
      const result = await this._ctrl.createNewSong(song)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePutSong (req, res) {
    try {
      const song = req.body
      const result = await this._ctrl.updateSong(song)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleDeleteSong (req, res) {
    try {
      const song = req.body
      const result = await this._ctrl.deleteSong(song._id)
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

export default SongRouter
