class ArtistRouter {
  constructor (router, controller, response, httpCode, createUserValidation, checkToken, chekRole) {
    this._router = router()
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkArtist = createUserValidation
    this._checkToken = checkToken
    this._checkRole = chekRole
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkArtist, this._checkRole, this.handlePostArtist.bind(this))
    this._router.put('/', this._checkRole, this.handlePutArtist.bind(this))
    this._router.delete('/', this._checkRole, this.handleDeleteArtist.bind(this))
    this._router.get('/', this._checkToken, this.handleGetArtist.bind(this))
  }

  async handlePostArtist (req, res) {
    try {
      const artist = req.body
      const result = await this._ctrl.createNewArtist(artist)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePutArtist (req, res) {
    try {
      const artist = req.body
      const result = await this._ctrl.updateArtist(artist)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleDeleteArtist (req, res) {
    try {
      const artist = req.body
      const result = await this._ctrl.deleteArtist(artist._id)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetArtist (req, res) {
    if (Object.keys(req.query).length > 0) {
      try {
        const result = await this._ctrl.getOneArtist('_name', req.query._name)
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        const result = await this._ctrl.getAllArtist()
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    }
  }
}

export default ArtistRouter
