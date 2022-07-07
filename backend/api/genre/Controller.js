class GenreController {
  constructor (serviceGenre, genre) {
    this._service = serviceGenre
    this._entity = genre
  }

  async createNewGenre (genre) {
    const newGenre = new this._entity(genre)
    const response = await this._service.save('genre', newGenre)
    return response
  }

  async updateGenre (genre) {
    const response = await this._service.update('genre', genre)
    return response
  }

  async deleteGenre (id) {
    const response = await this._service.delete('genre', id)
    return response
  }

  async getOneGenre (atribute, value) {
    const response = await this._service.findByAtribute('genre', atribute, value)
    return response
  }

  async getAllGenre () {
    const response = await this._service.all('genre')
    return response
  }
}

export default GenreController
