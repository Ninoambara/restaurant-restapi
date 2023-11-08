const express = require("express");
const Menu = require("../models/menu");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/:id", Controller.fetchOneItem)
router.get("/", Controller.fetchMenu);

module.exports = router;
