class Song {
  constructor (song) {
    // this._id = null
    this._title = song.title
    this._uri = song.uri
    this._image = song.image
    this._idArtist = song.idArtist
    this._idGenre = song.idGenre
    this._status = 1
  }

  // esta parte queda a discrecion crear los gets y set
  get id () {
    return this._id
  }

  set id (id) {
    return this._id
  }

  returnNumber () {
    return 5
  }
}

export default Song
