class GenreRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router()
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkGenre = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkGenre, this.handlePostGenre.bind(this))
    this._router.put('/', this.handlePutGenre.bind(this))
    this._router.delete('/', this.handleDeleteGenre.bind(this))
    this._router.get('/id', this.handleGetOneGenre.bind(this))
    this._router.get('/', this.handleGetGenre.bind(this))
  }

  handlePostGenre (req, res) {
    const genre = req.body
    const result = this._ctrl.createNewGenre(genre)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handlePutGenre (req, res) {
    const genre = req.body
    const result = this._ctrl.updateGenre(genre)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handleDeleteGenre (req, res) {
    const genre = req.body
    const result = this._ctrl.deleteGenre(genre._id)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handleGetOneGenre (req, res) {
    const genre = req.body
    const result = this._ctrl.getOneGenre(genre)
    res.send(result)
  }

  handleGetGenre (req, res) {
    const result = this._ctrl.getAllGenre()
    this._response.success(req, res, result, this._httpCode.OK)
  }
}

export default GenreRouter
