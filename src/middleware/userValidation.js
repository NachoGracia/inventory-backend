const { body } = require("express-validator");

const validateEmail = [
  body("email").isEmail().withMessage("Email must be a valir email adress"),
];

const validatePassword = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
];

const validatePasswordForLogin = [
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { validateEmail, validatePassword, validatePasswordForLogin };
