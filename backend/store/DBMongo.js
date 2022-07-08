import mongoose from 'mongoose'
import { config } from '../config/default.js'
import { models } from './ModelsMongo.js'

// const mongodb = async () => {
//   try {
//     const db = await mongoose.connect(config.dbMongo.uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     console.log(`MongoDB connected: ${db.connection.host}`)
//   } catch (error) {
//     console.log(error)
//   }
// }

export class DBMongo {
  constructor () {
    // mongodb()
    this.mongodb()
    this._models = models
  }

  async mongodb () {
    try {
      const db = await mongoose.connect(config.dbMongo.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log(`MongoDB connected: ${db.connection.host}`)
    } catch (error) {
      console.log(error)
    }
  }

  async save (model, data) {
    try {
      const newModel = this._models[model](data)
      const res = await newModel.save()
      console.log(res)
      return 'Guardado exitosamente'
    } catch (error) {
      return 'Fallo la creacion'
    }
  }

  async all (model) {
    try {
      const result = await this._models[model].find({ _status: '1' })
      if (Object.keys(result).length > 0) {
        return result
      }
      return 'No hay coincidencias'
    } catch (error) {
      console.log(error)
      return 'No hay coincidencias'
    }
  }

  async delete (model, id) {
    try {
      const result = await this._models[model].findByIdAndUpdate(id, { _status: '0' })
      if (result) {
        console.log(result)
        return 'Eliminación exitosa'
      }
      return 'Eliminacion fallida'
    } catch (error) {
      console.log(error)
      return 'Eliminacion fallida'
    }
  }

  async deleteOneSong (model, id) {
    try {
      const result = await this._models[model].findByIdAndDelete(id)
      if (result) {
        console.log(result)
        return 'Eliminacion exitosa'
      }
      return 'Eliminacion fallida'
    } catch (error) {
      console.log(error)
      return 'Eliminacion fallida'
    }
  }

  async update (model, data) {
    // console.log(data)
    try {
      const result = await this._models[model].findByIdAndUpdate(data._id, data)
      if (result) {
        console.log(result)
        console.log('if')
        return 'Actualizacion exitosa'
      }
      return 'Actualizacion fallida'
    } catch (error) {
      // console.log(error)
      return 'Actualizacion fallida'
    }
    // console.log(result)
  }

  async findByAtribute (model, atribute, value) {
    try {
      const result = await this._models[model].find().where(atribute).all(value)
      console.log(result)
      if (result.length > 0) {
        console.log(result)
        return result
      }
      return 'No hay coincidencias'
    } catch (error) {
      console.log(error)
      return 'No hay coincidencias'
    }
    // return result[0]
  }
}

// const test = new DBMongo()
// test.insertData(userModel, {
//   _username: 'username',
//   _name: 'otro nombres',
//   _email: 'email@gmail.com',
//   _password: 'password',
//   _avatar: 'http://uri',
//   _idRole: 1,
//   _idAccount: 2,
//   _status: 1
// }).then(result => {
//   console.log(result)
// }, error => {
//   console.log(error)
// })

// test.insertData(songModel, {
//   _title: 'username',
//   _uri: 'otro nombres',
//   _image: 'email@gmail.com',
//   _idArtist: 1,
//   _idGenre: 2,
//   _status: 1
// }).then(result => {
//   console.log(result)
// }, error => {
//   console.log(error)
// })

// test
//   .all()
//   .then(result => {
//     console.log(result)
//   }, error => {
//     console.log(error)
//   })

// test
//   .delete('62c7071f56c56426ec75d3a9')
//   .then(result => {
//     console.log(result)
//   }, error => {
//     console.log(error)
//   })

// test
//   .update('62c70fa3cf51d19048db32cc', { _email: 'otro@gmail.com' })
//   .then(result => {
//     console.log(result)
//   }, error => {
//     console.log(error)
//   })

// test
//   .update2('songs', '62c71f86d507b2efb9fb9952')
//   .then(result => {
//     console.log(result)
//   }, error => {
//     console.log(error)
//   })
