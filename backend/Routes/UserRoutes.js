const express = require("express");
const router = express.Router();
const { registerUser, authUser, allUsers } = require("../Controllers/User");
const { protect } = require("../Middleware/auth");

router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);

module.exports = router;
