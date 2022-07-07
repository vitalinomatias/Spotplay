// los controladores se encargan de realizar la logica del negocio

class SongController {
  constructor (serviceSong, song) {
    this._service = serviceSong
    this._entity = song
  }

  async createNewSong (song) {
    const newSong = new this._entity(song)
    const response = await this._service.save('songs', newSong)
    return response
  }

  async updateSong (song) {
    const response = await this._service.update('songs', song)
    return response
  }

  async deleteSong (id) {
    const response = await this._service.delete('songs', id)
    return response
  }

  async getOneSong (atribute, value) {
    const response = await this._service.findByAtribute('songs', atribute, value)
    return response
  }

  async getAllSong () {
    const response = await this._service.all('songs')
    return response
  }
}

export default SongController
