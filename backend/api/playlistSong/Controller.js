class PlaylistSongController {
  constructor (servicePlaylistSong, playlistSong) {
    this._service = servicePlaylistSong
    this._entity = playlistSong
  }

  async createNewPlaylistSong (playlistSong) {
    const newSong = new this._entity(playlistSong)
    const response = await this._service.save('playlistsong', newSong)
    return response
  }

  async deleteSong (id) {
    const response = await this._service.deleteOneSong('playlistsong', id)
    return response
  }

  async getOneSong (atribute, value) {
    const response = await this._service.findByAtribute('playlistsong', atribute, value)
    return response
  }

  async getAllSong () {
    const response = await this._service.all('playlistsong')
    return response
  }
}

export default PlaylistSongController
