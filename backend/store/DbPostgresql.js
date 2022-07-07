import pg from 'pg'

export class DataPostgresql {
  constructor () {
    this._pool = this.getConnection()
  }

  async getConnection () {
    const pool = await new pg.Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'dbspotplay'
    })
    return pool
  }

  async save (table, data) {
    try {
      const query = `INSERT INTO ${table} (${Object.keys(data).join(',')}) VALUES (${Object.keys(data).map((current, index) => `$${index + 1}`).join(',')})`
      console.log(query)
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, Object.values(data))
      console.log(resultPool)
      return 'Creado exitosamente'
      // return resultPool
    } catch (error) {
      console.log(error)
    }
  }

  async update (table, data) {
  }

  async delete (table, data) {
    try {
      const query = `UPDATE ${table} SET _status = 0  where _id = ${data}`
      console.log(query)
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, Object.values(data))
      console.log(resultPool)
      return 'Eliminado exitosamente'
      // return resultPool
    } catch (error) {
      console.log(error)
    }
  }

  async all (table) {
    try {
      const query = `SELECT * FROM ${table} where _status = '1'`
      console.log(query)
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      console.log(resultPool.rows)
      return resultPool.rows
    } catch (error) {
      console.log(error)
    }
  }

  async findByAtribute (table, attribute, value) {
    console.log(table, attribute, value)
    try {
      const query = `SELECT * FROM ${table} WHERE ${attribute} = $1`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, [value])
      console.log(resultPool.rows)
      return resultPool.rows[0]
    } catch (error) {
      console.log(error)
    }
  }
}

// const test = new DataPostgresql()
// const result = test.all('songs')
// console.log(result)
