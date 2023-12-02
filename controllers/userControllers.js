const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const user = await userModel.findOne({ $or: [{ email: username }, { username }] });
    if (!user) throw new Error("user not found!");
    const checkIfPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!checkIfPasswordCorrect) throw new Error("email or password missmatch");
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_PASSWORD, {
      expiresIn: "20h",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const userList = async (req, res, next) => {
  try {
    const users = await userModel.find().lean();
    console.log("userList");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const register = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = await userModel.create({
      ...req.body,
      password: bcrypt.hashSync(password, 12),
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const profile = async (req, res, next) => {
  res.status(200).json(req.user);
};
module.exports = {
  login,
  userList,
  register,
  profile,
};
