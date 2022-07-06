class ArtistRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router()
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkArtist = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkArtist, this.handlePostArtist.bind(this))
    this._router.put('/', this.handlePutArtist.bind(this))
    this._router.delete('/', this.handleDeleteArtist.bind(this))
    this._router.get('/id', this.handleGetOneArtist.bind(this))
    this._router.get('/', this.handleGetArtist.bind(this))
    this._router.get('/idGenre', this.handleGetGenre.bind(this))
  }

  handlePostArtist (req, res) {
    const artist = req.body
    const result = this._ctrl.createNewArtist(artist)
    this._response.success(req, res, result, this._httpCode.OK)
    // res.send(result)
  }

  handlePutArtist (req, res) {
    const artist = req.body
    const result = this._ctrl.updateArtist(artist)
    this._response.success(req, res, result, this._httpCode.OK)
    // res.send(result)
  }

  handleDeleteArtist (req, res) {
    const artist = req.body
    const result = this._ctrl.deleteArtist(artist._id)
    this._response.success(req, res, result, this._httpCode.OK)
    // res.send(result)
  }

  handleGetOneArtist (req, res) {
    const artist = req.body
    const result = this._ctrl.getOneArtist(artist)
    res.send(result)
  }

  handleGetArtist (req, res) {
    const result = this._ctrl.getAllArtist()
    this._response.success(req, res, result, this._httpCode.OK)
    // res.send(result)
  }

  handleGetGenre (req, res) {
    const genre = req.body
    const result = this._ctrl.getGenre(genre)
    res.send(result)
  }
}

export default ArtistRouter
