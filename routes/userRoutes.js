const express = require("express");
const {signup,signin} = require("./../controllers/userController")

const router = express.Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)

// added logout functinality in front end on clicking logout i am removing token 


module.exports = router