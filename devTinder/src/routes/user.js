const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// who is send request which is Pending
userRouter.get("/user/requests",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user;
    const connectionRequests =await connectionRequest.find({
      toUserId:loggedInUser._id,
      status:"interested"
    }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"]);
    res.json({
      message:"Data fetched successfully",
      data:connectionRequests,
    });

  }catch(err){
    res.status(400).send(err.message);
  }
})

// who is connected me or who has accepted my connection
userRouter.get("/user/connections",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user;
    const connectionRequests=await connectionRequest.find({
      $or:[
        {toUserId:loggedInUser._id, status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"},
      ]
    }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"])
    .populate("toUserId",["firstName","lastName","photoUrl","age","gender","about"]);
    res.json({
      data:connectionRequests
    });

  }catch(err){
    res.status(400).send("ERROR" + err.message);
  }
})


userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const loggedInUserId = loggedInUser._id.toString();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find connections (both where user is sender or receiver)
    const newConnectionRequest = await connectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId },
        { toUserId: loggedInUserId },
      ]
    }).select("fromUserId toUserId");

    // Build a set of user IDs to hide from the feed
    const hideUserFromFeed = new Set();
    newConnectionRequest.forEach(req => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    // Ensure the logged-in user's own profile is also excluded
    hideUserFromFeed.add(loggedInUserId);

    // Fetch users not in the hidden set
    const users = await User.find({
      _id: { $nin: Array.from(hideUserFromFeed) }
    })
      .select("firstName lastName photoUrl about age gender")
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Feed fetched successfully",
      data: users
    });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
