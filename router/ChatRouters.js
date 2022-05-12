const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
  getInterests
} = require("../api/ChatRoute");
const router = express.Router();

router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);
router.route("/getInterests").get(getInterests);

module.exports = router;