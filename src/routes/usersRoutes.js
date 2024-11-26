const express = require('express')

const router = express.Router()
const {
  getUsers,
  createUser,
  login,
  deleteUserController
} = require('../controllers/UserController')
const {
  validateEmail,
  validatePassword,
  validatePasswordForLogin
} = require('../middleware/userValidation')
const { validateRequest } = require('../middleware/validateRequest')
const verifyToken = require('../middleware/verifyToken ')

router.get('/users', getUsers)
router.post(
  '/users',
  validateEmail,
  validatePassword,
  validateRequest,
  createUser
)
router.post(
  '/users/login',
  validateEmail,
  validatePasswordForLogin,
  validateRequest,
  login
)

router.delete('/users/delete/:id', validateRequest, deleteUserController)

// router.get("/dashboard", verifyToken, validateRequest, dashboard);
module.exports = router
