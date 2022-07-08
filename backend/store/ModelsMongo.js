import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _username: { type: String, required: true },
  _name: { type: String, required: true },
  _email: { type: String, required: true },
  _password: { type: String, required: true },
  _avatar: { type: String, required: true },
  _idRole: { type: String, required: true },
  _idAccount: { type: String, required: true },
  _status: { type: String, required: true }
})

const songSchema = new mongoose.Schema({
  _title: { type: String, required: true },
  _uri: { type: String, required: true },
  _image: { type: String, required: true },
  _idArtist: { type: String, required: true },
  _idGenre: { type: String, required: true },
  _status: { type: String, required: true }
})

const artistSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _avatar: { type: String, required: true },
  _idGenre: { type: String, required: true },
  _status: { type: String, required: true }
})

const genreSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _status: { type: String, required: true }
})

const playlistSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _image: { type: String, required: true },
  _idUser: { type: String, required: true },
  _status: { type: String, required: true }
})

const playlistSongSchema = new mongoose.Schema({
  _idPlaylist: { type: String, required: true },
  _idSong: { type: String, required: true }
})

const userModel = mongoose.model('users', userSchema)
const songModel = mongoose.model('songs', songSchema)
const artistModel = mongoose.model('artist', artistSchema)
const genreModel = mongoose.model('genre', genreSchema)
const playlistModel = mongoose.model('playlist', playlistSchema)
const playlistSongModel = mongoose.model('playlistsong', playlistSongSchema)

export const models = {
  users: userModel,
  songs: songModel,
  artist: artistModel,
  genre: genreModel,
  playlist: playlistModel,
  playlistsong: playlistSongModel
}
