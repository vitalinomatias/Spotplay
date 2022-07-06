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
    // this._router.get('/id', this.handleGetOneSong.bind(this))
    this._router.get('/', this.handleGetSong.bind(this))
    // this._router.get('/idGenre', this.handleGetGenre.bind(this))
    // this._router.get('/idArtist', this.handleGetArtist.bind(this))
  }

  handlePostSong (req, res) {
    const song = req.body
    const result = this._ctrl.createNewSong(song)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handlePutSong (req, res) {
    const song = req.body
    const result = this._ctrl.updateSong(song)
    this._response.success(req, res, result, this._httpCode.OK)
    // res.send(result)
  }

  handleDeleteSong (req, res) {
    const song = req.body
    const result = this._ctrl.deleteSong(song._id)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handleGetOneSong (req, res) {
    const song = req.body
    const result = this._ctrl.getOneSong(song)
    res.send(result)
  }

  handleGetSong (req, res) {
    if (Object.keys(req.query).length > 0) {
    // if (req.query) {
      const result = this._ctrl.getOneSong('_title', req.query._title)
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      try {
        const result = this._ctrl.getAllSong()
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    }
  }

  handleGetGenre (req, res) {
    const genre = req.body
    const result = this._ctrl.getGenre(genre)
    res.send(result)
  }

  handleGetArtist (req, res) {
    const artist = req.body
    const result = this._ctrl.getArtist(artist)
    res.send(result)
  }
}

export default SongRouter
