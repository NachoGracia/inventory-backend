const express = require("express");

const router = express.Router();
const {
  getUsers,
  createUser,
  login,
} = require("../controllers/UserController");
const {
  validateEmail,
  validatePassword,
  validatePasswordForLogin,
} = require("../middleware/userValidation");
const { validateRequest } = require("../middleware/validateRequest");

router.get("/users", getUsers);
router.post(
  "/users",
  validateEmail,
  validatePassword,
  validateRequest,
  createUser
);
router.post(
  "/users/login",
  validateEmail,
  validatePasswordForLogin,
  validateRequest,
  login
);
module.exports = router;
