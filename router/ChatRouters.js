const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  getInterests
} = require("../api/ChatRoute");
const router = express.Router();

router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/getInterests").get(getInterests);

module.exports = router;