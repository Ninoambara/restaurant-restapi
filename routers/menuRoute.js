const express = require("express");
const Menu = require("../models/Menu");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.fetchMenu);
router.get("/:id", Controller.fetchOneItem)

module.exports = router;
