const { getAllUsers, insertUser } = require("../models/UserModel");

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
    const newUser = await insertUser(email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

module.exports = { getUsers, createUser };
