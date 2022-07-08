class PlaylistRouter {
  constructor (router, controller, response, httpCode, createUserValidation, checkToken) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkPlaylist = createUserValidation
    this._checkToken = checkToken
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkToken, this._checkPlaylist, this.handlePostPlaylist.bind(this))
    this._router.put('/', this._checkToken, this.handlePutPlaylist.bind(this))
    this._router.delete('/', this._checkToken, this.handleDeletePlaylist.bind(this))
    this._router.get('/', this._checkToken, this.handleGetPlaylist.bind(this))
  }

  async handlePostPlaylist (req, res) {
    try {
      const playlist = req.body
      const result = await this._ctrl.createNewPlaylist(playlist)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePutPlaylist (req, res) {
    try {
      const playlist = req.body
      const result = await this._ctrl.updatePlaylist(playlist)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleDeletePlaylist (req, res) {
    try {
      const playlist = req.body
      const result = await this._ctrl.deletePlaylist(playlist._id)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetPlaylist (req, res) {
    if (Object.keys(req.query).length > 0) {
      try {
        const result = await this._ctrl.getOnePlaylist('_name', req.query._name)
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      try {
        const result = await this._ctrl.getAllPlaylist()
        this._response.success(req, res, result, this._httpCode.OK)
      } catch (error) {
        this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    }
  }
}

export default PlaylistRouter
