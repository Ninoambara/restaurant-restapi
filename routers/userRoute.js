const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/register", UserController.regis);
router.post("/login", UserController.login);
router.get("/", UserController.findAll);

module.exports = router;
