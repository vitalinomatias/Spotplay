import fs from 'fs'

export class DataJson {
  constructor () {
    this._dataPath = './store/db.json'
    this.setTables()
  }

  setTables () {
    const tables = {
      song: [],
      artist: [],
      genre: [],
      playlist: [],
      user: [],
      account: [],
      role: []
    }
    const items = this.readJsonFile()
    if (items.length === 0) {
      this.writeJsonFile(tables)
    }
  }

  readJsonFile () {
    const contenFile = fs.readFileSync(this._dataPath, 'utf-8')
    if (contenFile) {
      return JSON.parse(contenFile)
    }
    return []
  }

  writeJsonFile (data) {
    const jsonData = JSON.stringify(data, null, '')
    fs.writeFileSync(this._dataPath, jsonData)
  }

  generatePk (table) {
    const lastItem = this.all(table).pop()
    if (lastItem) {
      return ++lastItem._id
    }
    return 1
  }

  save (table, data) {
    const items = this.readJsonFile()
    data._id = this.generatePk(table)
    data._status = 1
    items[table].push(data)
    this.writeJsonFile(items)
    return 'Create new item'
  }

  all (table) {
    const items = this.readJsonFile()
    const newItems = items[table].filter(item => item._status === 1)
    // console.log(newItems)
    // return items[table] || []
    return newItems || []
  }

  update (table, data) {
    const items = this.readJsonFile()
    // let itemUpdate = items[table].find(item => item._id === data._id)
    // console.log('data')
    // console.log(data)
    // console.log('nuevo item')
    // itemUpdate._title = data._title
    // itemUpdate._uri
    // console.log(itemUpdate)
    // console.log('item anterior')
    // console.log(items[table])
    const newItems = items[table].filter(item => item._id !== data._id)
    newItems.push(data)
    items[table] = newItems
    this.writeJsonFile(items)
    return data
  }

  delete (table, data) {
    const items = this.readJsonFile()
    const itemDelete = items[table].find(item => item._id === data)
    itemDelete._status = 0
    this.writeJsonFile(items)
    return 'Delete item'
  }

  findByAtribute (table, atribute, value) {
    const items = this.readJsonFile()
    const item = items[table].find(item => item[atribute] === value)
    if (item) {
      return item
    }
    return null
  }
}

// const test = new DataJson()
// const result = test.findByAtribute('user', '_username', 'user.username')
// console.table(result)

// const data = new DataJson()
// // data.save('user', { name: 'user3', singer: 'singer2' })
// // const resultado = data.all('song')
// // console.table(resultado)

// data.save('user', { id: null, name: 'Vitalino', lastName: 'Leonel' })
// data.save('song', { id: null, name: 'song1', singer: 'singer1' })

// // // const resultado = data.all('song')
// // console.table(resultado)
