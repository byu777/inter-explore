const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
  getInterests,
  updateUserProfile
} = require("../api/ChatRoute");
const router = express.Router();

router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);
router.route("/getInterests").get(getInterests);
router.route("/profile").post(updateUserProfile);

module.exports = router;