const express = require("express");
const { protect } = require("../Middleware/auth");
const router = express.Router();
const {
  sendMessage,
  allMessages,
} = require("../Controllers/messageControllers");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
