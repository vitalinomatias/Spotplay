class GenreController {
  constructor (serviceGenre, genre) {
    this._service = serviceGenre
    this._entity = genre
  }

  createNewGenre (genre) {
    const newGenre = new this._entity(genre)
    const response = this._service.save('genre', newGenre)
    return response
  }

  updateGenre (genre) {
    const response = this._service.update('genre', genre)
    return response
  }

  deleteGenre (id) {
    const response = this._service.delete('genre', id)
    return response
  }

  getOneGenre (id) {
    console.log(id)
    return 'genre'
  }

  getAllGenre () {
    const response = this._service.all('genre')
    return response
  }
}

export default GenreController
