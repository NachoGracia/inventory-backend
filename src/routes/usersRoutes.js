const express = require('express')

const router = express.Router()
const {
  getAllUsersController,
  createUserController,
  loginUserController,
  deleteUserController
} = require('../controllers/UserController')
const {
  validateEmail,
  validatePassword,
  validatePasswordForLogin
} = require('../middleware/userValidation')
const { validateRequest } = require('../middleware/validateRequest')
const verifyToken = require('../middleware/verifyToken ')

router.get('/users', getAllUsersController)
router.post(
  '/users',
  validateEmail,
  validatePassword,
  validateRequest,
  createUserController
)
router.post(
  '/users/login',
  validateEmail,
  validatePasswordForLogin,
  validateRequest,
  loginUserController
)

router.delete('/users/delete/:id', validateRequest, deleteUserController)

// router.get("/dashboard", verifyToken, validateRequest, dashboard);
module.exports = router
