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
    this._router.get('/', this.handleGetGenre.bind(this))
  }

  async handlePostGenre (req, res) {
    const genre = req.body
    const result = await this._ctrl.createNewGenre(genre)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  async handlePutGenre (req, res) {
    const genre = req.body
    const result = await this._ctrl.updateGenre(genre)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  async handleDeleteGenre (req, res) {
    const genre = req.body
    const result = await this._ctrl.deleteGenre(genre._id)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  async handleGetGenre (req, res) {
    if (Object.keys(req.query).length > 0) {
      try {
        const result = await this._ctrl.getOneGenre('_name', req.query._name)
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        const result = await this._ctrl.getAllGenre()
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    }
  }
}

export default GenreRouter
