const { getDbClient } = require('../db')

// Obtener todos los usuarios
const getAllUsers = async () => {
  const client = await getDbClient()

  try {
    const res = await client.query('SELECT * FROM users')

    return res.rows
  } catch (error) {
    console.error('Error obteniendo usuarios:', error)
    throw error
  } finally {
    client.release()
  }
}

// Insertar usuario

const createUser = async (email, password, role = 'user') => {
  const client = await getDbClient()
  try {
    const res = await client.query(
      'INSERT INTO users (email, password, role) VALUES ($1,$2,$3) RETURNING *',
      [email, password, role]
    )
    return res.rows[0]
  } catch (error) {
    console.error('Error insertando usuario', error)
    throw error
  } finally {
    client.release()
  }
}

// Login usuario

const loginUser = async (email) => {
  const client = await getDbClient()

  try {
    const res = await client.query(
      'SELECT email, password FROM users WHERE email = $1',
      [email]
    )
    return res.rows[0]
  } catch (error) {
    console.error('Error gettin email from db')
    throw error
  } finally {
    client.release()
  }
}

// Delete usuario

const deleteUser = async (id) => {
  const client = await getDbClient()

  try {
    const res = await client.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    )
    return res.rows[0]
  } catch (error) {
    console.error('Error delete user', error)
    throw error
  } finally {
    client.release()
  }
}

module.exports = { getAllUsers, createUser, loginUser, deleteUser }
