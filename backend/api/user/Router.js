import { transporter } from '../../lib/helpers.js'
class UserRouter {
  constructor (router, controller, response, httpCode, createUserValidation) {
    this._router = router() // instancia del enrutador de express
    this._ctrl = controller
    this._response = response
    this._httpCode = httpCode
    this._checkUser = createUserValidation
    this._transporter = transporter
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/signup', this._checkUser, this.handleSignUp.bind(this))
    this._router.put('/', this.handlePutUser.bind(this))
    // this._router.delete('/', this.handleDeleteUser.bind(this))
    // this._router.get('/id', this.handleGetOneUser.bind(this))
  }

  async handleSignUp (req, res) {
    try {
      const user = req.body
      // console.log(user)
      const result = await this._ctrl.createNewUser(req.body)
      this._response.success(req, res, result, 201)
      await transporter.sendMail({
        from: '"Spotplay" <vitalino.1990@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Spotplay', // Subject line
        html: `<b> ${user.name} Bienvenido a Spotplay</b>`
      })
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.OK)
    }
  }

  async handlePutUser (req, res) {
    try {
      const user = req.body
      const result = await this._ctrl.updateUser(user)
      this._response.success(req, res, result, this._httpCode.OK)
    } catch (error) {
      this._response.success(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
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
