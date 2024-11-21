const { getAllUsers, insertUser, loginUser } = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error loading users" });
  }
};

const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const newUser = await insertUser(email, passwordHashed, role);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required  for login" });
  }

  try {
    const user = await loginUser(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", email: user.email });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers, createUser, login };
