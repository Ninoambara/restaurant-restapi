const express = require("express")
const Controller = require("../controllers/controller")
const router  = express.Router()


router.post("/", Controller.orderNew)

module.exports = router