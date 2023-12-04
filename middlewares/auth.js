const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const config = process.env;

exports.authorize = (passedRole = null) => async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if (!token) throw new Error("you are not authorized to do this!");
    const data = jwt.verify(token, config.JWT_PASSWORD);
    if (!data) throw new Error("forbidden access");
    const user = await UserModel.findById(data.id).lean();
    req.user = user;
    req.role = user.role;
    if(passedRole && passedRole !== user.role) throw new Error("forbidden access !")
    next();
  } catch (error) {
    res.status(401).json({ message: "you are not authorized to do this!" });
  }
};
