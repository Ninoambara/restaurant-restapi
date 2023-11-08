const express = require("express");
const router = express.Router();
const menuRoute = require("./menuRoute");
const orderRoute = require("./orderRoute");
const userRoute = require("./userRoute");
const authentication = require("../middlewares/authentication");

router.use("/users", userRoute);
router.use(authentication);
router.use("/menus", menuRoute);
router.use("/orders", orderRoute);

module.exports = router;
