const express = require("express");
const router = express.Router();
const menuRoute = require("./menuRoute");
const orderRouter = require("./orderRouter");

router.use("/menus", menuRoute);
router.use("/orders", orderRouter);

module.exports = router;
