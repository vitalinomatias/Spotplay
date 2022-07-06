class ArtistController {
  constructor (serviceArtist, artist) {
    this._service = serviceArtist
    this._entity = artist
  }

  createNewArtist (artist) {
    const newArtist = new this._entity(artist)
    const response = this._service.save('artist', newArtist)
    return response
  }

  updateArtist (artist) {
    const response = this._service.update('artist', artist)
    return response
  }

  deleteArtist (id) {
    const response = this._service.delete('artist', id)
    return response
  }

  getOneArtist (id) {
    console.log(id)
    return 'artist'
  }

  getAllArtist () {
    const response = this._service.all('artist')
    return response
  }

  getGenre (idGenre) {
    console.log(idGenre)
    return 'All artist by genre'
  }
}

export default ArtistController
