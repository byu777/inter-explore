const asyncHandler = require("express-async-handler");
const interests = require("../router/models/interestGroup");
const User = require("../router/models/Users");

  const fetchChats = asyncHandler(async (req, res) => {
    try {
        interests.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("Users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

const createGroupChat = asyncHandler(async (req, res) => {
  //  var users = JSON.parse(req.body.users);
    
    // users.push(req.user);
  
    try {
      const groupChat = await interests.create({
        InterestName: req.body.InterestName,
        users: users,
      });
  
    //   const fullGroupChat = await interests.findOne({ _id: groupChat._id })
    //     .populate("Users", "-password")

    //  res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await interests.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("Users", "-password")
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });

  const getInterests = asyncHandler(async (req, res) => {
    try {
      const names = await interests.find();
      const allInterests = []
      for(let i = 0; i < names.length; i++){
        allInterests[i] = names[i].InterestName;
      }
      res.send(allInterests);
    } catch (error) {
      console.log(error)
    }
  })

  module.exports = {
    fetchChats,
    createGroupChat,
    addToGroup,
    getInterests
  };