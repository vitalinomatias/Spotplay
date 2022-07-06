// los controladores se encargan de realizar la logica del negocio

class SongController {
  constructor (serviceSong, song) {
    this._service = serviceSong
    this._entity = song
  }

  createNewSong (song) {
    const newSong = new this._entity(song)
    const response = this._service.save('song', newSong)
    return response
  }

  updateSong (song) {
    const response = this._service.update('song', song)
    return response
    // console.log(song)
    // return 'Updated a song'
  }

  deleteSong (id) {
    const response = this._service.delete('song', id)
    return response
  }

  getOneSong (atribute, value) {
    // console.log(atribute)
    // console.log(value)
    const response = this._service.findByAtribute('song', atribute, value)
    // console.log(response)
    return response
  }

  getAllSong () {
    // return 'All songs'
    const response = this._service.all('song')
    return response
  }

  getGenre (idGenre) {
    console.log(idGenre)
    return 'All songs by genre'
  }

  getArtist (idArtist) {
    console.log(idArtist)
    return 'All songs by artist'
  }
}

export default SongController
