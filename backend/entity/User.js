class User {
  constructor (user) {
    this._id = null
    this._username = user.username
    this._name = user.name
    this._email = user.email
    this._password = user.password
    this._avatar = user.avatar
    this._idRole = user.idRole
    this._idAccount = user.idAccount
    this._status = null
  }

  // para encriptar la password de cada usuario

  encryptPassword (password, hashPassword) {
    this._password = hashPassword(password)
  }
}

export default User
