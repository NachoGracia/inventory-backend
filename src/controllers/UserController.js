const {
  getAllUsers,
  insertUser,
  loginUser,
  deteleUser
} = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error loading users' })
  }
}

const createUser = async (req, res) => {
  const { email, password, role } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, salt)
    const newUser = await insertUser(email, passwordHashed, role)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email and password are required  for login' })
  }

  try {
    const user = await loginUser(email)

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const validatePassword = await bcrypt.compare(password, user.password)

    if (!validatePassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // Solo en HTTPS si está en producción
      sameSite: 'strict', // Previene CSRF
      maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const logout = (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

const deleteUserController = async (req, res) => {
  const { id } = req.params

  try {
    const deletedUser = await deteleUser(id)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User deleted successfully', deletedUser })
  } catch (error) {
    console.error('Error in deleteUserController:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { getUsers, createUser, login, logout, deleteUserController }
