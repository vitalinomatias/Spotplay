class PlaylistController {
  constructor (servicePlaylist, playlist) {
    this._service = servicePlaylist
    this._entity = playlist
  }

  createNewPlaylist (playlist) {
    const newPlaylist = new this._entity(playlist)
    const response = this._service.save('playlist', newPlaylist)
    return response
  }

  updatePlaylist (playlist) {
    const response = this._service.update('playlist', playlist)
    return response
  }

  deletePlaylist (id) {
    const response = this._service.delete('playlist', id)
    return response
  }

  getAllPlaylist () {
    const response = this._service.all('playlist')
    return response
  }
}

export default PlaylistController
