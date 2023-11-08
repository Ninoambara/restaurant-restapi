const express = require("express")
const router  = express.Router()
const Controller = require("../controllers/controller")


router.post("/", Controller.orderNew)

module.exports = router