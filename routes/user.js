const express = require("express");
const { login, userList, register, profile } = require("../controllers/userControllers");
const { authorize } = require("../middlewares/auth");
const router = express.Router();

router.get("/", userList);
router.post("/login", login);
router.post("/register", register);
router.get("/profile", authorize(), profile)
module.exports = router;
