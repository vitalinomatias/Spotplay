class PlaylistRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkPlaylist = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/', this._checkPlaylist, this.handlePostPlaylist.bind(this))
    this._router.put('/', this.handlePutPlaylist.bind(this))
    this._router.delete('/', this.handleDeletePlaylist.bind(this))
    // this._router.get('/id', this.handleGetOnePlaylist.bind(this))
    this._router.get('/', this.handleGetPlaylist.bind(this))
  }

  handlePostPlaylist (req, res) {
    const playlist = req.body
    const result = this._ctrl.createNewPlaylist(playlist)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handlePutPlaylist (req, res) {
    const playlist = req.body
    const result = this._ctrl.updatePlaylist(playlist)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handleDeletePlaylist (req, res) {
    const playlist = req.body
    const result = this._ctrl.deletePlaylist(playlist._id)
    this._response.success(req, res, result, this._httpCode.OK)
  }

  handleGetPlaylist (req, res) {
    const result = this._ctrl.getAllPlaylist()
    this._response.success(req, res, result, this._httpCode.OK)
  }
}

export default PlaylistRouter
