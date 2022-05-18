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
        user: users
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
        $push: { user: userId },
      },
      {
        new: true,
      }
    )
      .populate("user", "-password")
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });

  const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await interests.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
 

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});
const Deleteinterest = asyncHandler(async (req, res) => {
  const interest = await interests.findById(req.params.id);

  if (interest.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (interest) {
    await interests.remove();
    res.json({ message: " Removed" });
  } else {
    res.status(404);
    throw new Error("ound");
  }
});

  // Grabs each interest name and returns a list of just the names
  const getInterestNames = asyncHandler(async (req, res) => {
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

  // Grabs all interests from database and returns them as the whole object array
  const getAllInterests = asyncHandler(async (req, res,) =>  {
    try {
      const allInterests = await interests.find();
      res.send(allInterests);
    } catch (error) {
      console.log(error);
    }
  })


  module.exports = {
    fetchChats,
    createGroupChat,
    addToGroup,
    removeFromGroup,
    getInterestNames,
    getAllInterests,
    Deleteinterest
  };
  
  // animlas <----------- when you are fetching interest get that all user id  from that interest <------

    // have to get this user id <-------> animals

  // or we could to bejinmin be like if they have a typo we will just remove them from chat and possibly tell the users that "this is removed with push notification" 

  // ^ <=----- add those ppl to a newly created animals by admin which edit profile 
