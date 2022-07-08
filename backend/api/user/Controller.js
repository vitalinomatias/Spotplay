// los controladores se encargan de realizar la logica del negocio
class UserController {
  constructor (serviceUser, user, hashPassword) {
    this._service = serviceUser
    this._entity = user
    this._hashPassword = hashPassword
  }

  async createNewUser (user) {
    console.log(user)
    if (user.username && user.email && user.password) {
      const newUser = new this._entity(user)
      newUser.encryptPassword(user.password, this._hashPassword)
      console.log(newUser)
      // const response = await this._service.save('users', newUser) // con postres
      const response = await this._service.save('users', newUser) // con mongo
      return response
    } else {
      throw new Error('Missing parameter')
    }
  }

  async updateUser (user) {
    // const updateUser = user
    // console.log(user)
    // console.log(user._password)
    // user.encryptPassword(user._password, this._hashPassword)
    // console.log(updateUser)
    const response = await this._service.update('users', user)
    return response
  }

  // updateSong (song) {
  //   const response = this._service.update('song', song)
  //   return response
  //   // console.log(song)
  //   // return 'Updated a song'
  // }

  // deleteSong (id) {
  //   const response = this._service.delete('song', id)
  //   return response
  // }

  // getOneSong (id) {
  //   console.log(id)
  //   return 'song'
  // }

  // getAllSong () {
  //   // return 'All songs'
  //   const response = this._service.all('song')
  //   return response
  // }

  // getGenre (idGenre) {
  //   console.log(idGenre)
  //   return 'All songs by genre'
  // }

  // getArtist (idArtist) {
  //   console.log(idArtist)
  //   return 'All songs by artist'
  // }
}

export default UserController
