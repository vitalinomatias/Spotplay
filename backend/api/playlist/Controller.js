class PlaylistController {
  constructor (servicePlaylist, playlist) {
    this._service = servicePlaylist
    this._entity = playlist
  }

  async createNewPlaylist (playlist) {
    const newPlaylist = await new this._entity(playlist)
    const response = this._service.save('playlist', newPlaylist)
    return response
  }

  async updatePlaylist (playlist) {
    const response = await this._service.update('playlist', playlist)
    return response
  }

  async deletePlaylist (id) {
    const response = await this._service.delete('playlist', id)
    return response
  }

  async getAllPlaylist () {
    const response = await this._service.all('playlist')
    return response
  }

  async getOnePlaylist (atribute, value) {
    const response = await this._service.findByAtribute('playlist', atribute, value)
    return response
  }
}

export default PlaylistController
