class ArtistController {
  constructor (serviceArtist, artist) {
    this._service = serviceArtist
    this._entity = artist
  }

  async createNewArtist (artist) {
    const newArtist = new this._entity(artist)
    const response = await this._service.save('artist', newArtist)
    return response
  }

  async updateArtist (artist) {
    const response = await this._service.update('artist', artist)
    return response
  }

  async deleteArtist (id) {
    const response = await this._service.delete('artist', id)
    return response
  }

  // getOneArtist (id) {
  //   console.log(id)
  //   return 'artist'
  // }

  async getOneArtist (atribute, value) {
    const response = await this._service.findByAtribute('artist', atribute, value)
    return response
  }

  async getAllArtist () {
    const response = await this._service.all('artist')
    return response
  }
}

export default ArtistController
