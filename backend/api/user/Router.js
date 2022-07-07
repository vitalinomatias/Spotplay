class UserRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkUser = createUserValidation
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/signup', this._checkUser, this.handleSignUp.bind(this))
    // this._router.put('/', this.handlePutUser.bind(this))
    // this._router.delete('/', this.handleDeleteUser.bind(this))
    // this._router.get('/id', this.handleGetOneUser.bind(this))
  }

  async handleSignUp (req, res) {
    // const user = req.body
    const result = await this._ctrl.createNewUser(req.body)
    if (result.status === 'success') {
      this._response.success(req, res, result, 201)
    }
    this._response.success(req, res, result, this._httpCode.OK)
  }

  // handlePostUser (req, res) {
  //   const user = req.body
  //   const result = this._ctrl.createNewUser(user)
  //   res.send(result)
  // }

  // handleDeleteUser (req, res) {
  //   const user = req.body
  //   const result = this._ctrl.deleteUser(user)
  //   res.send(result)
  // }

  // handleGetOneUser (req, res) {
  //   const user = req.body
  //   const result = this._ctrl.getOneUser(user)
  //   res.send(result)
  // }
}

export default UserRouter
