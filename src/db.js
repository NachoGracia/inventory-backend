const dotenv = require('dotenv')
dotenv.config()
const { Pool } = require('pg')

const pass = process.env.PG_PASSWORD

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inventory',
  password: pass,
  port: 5432
})

const getDbClient = async () => {
  try {
    const client = await pool.connect()
    return client
  } catch (err) {
    console.error('Error al obtener cliente del pool', err)
  }
}

module.exports = { getDbClient }
