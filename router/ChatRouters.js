const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
} = require("../controllers/chatControllers");
const router = express.Router();

router.route("/").get(protect, fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);

module.exports = router;