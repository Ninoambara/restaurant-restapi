const express = require("express");
const router = express.Router();
const menuRoute = require("./menuRoute");

router.use("/menus", menuRoute);

module.exports = router;
