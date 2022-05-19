const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  getInterestNames,
  getAllInterests,
  getAllUsers,
  getInterests,
  updateUserProfile
} = require("../api/ChatRoute");
const router = express.Router();

router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/getInterestNames").get(getInterestNames);
router.route("/getAllInterests").get(getAllInterests);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getInterests").get(getInterests);
router.route("/profile").post(updateUserProfile);

module.exports = router;