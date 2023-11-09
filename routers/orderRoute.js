const express = require("express")
const router  = express.Router()
const Controller = require("../controllers/controller")


router.post("/", Controller.orderNew)
router.get("/", Controller.fetchAllOrder)
router.put("/checkout", Controller.checkoutOrder)

module.exports = router