const db = require("../models");

// POST - /api/exercise/new-user
exports.createUser = async (req, res, next) => {
  try {
    const user = await db.Users.create({
      username: req.body.username,
    });
    
    return res.json({
      username: user.username,
      _id: user._id
    })
     
  } catch (err) {
    if(err.code == 11000) {
      // if username already exist
      return next({status: 400, message: 'username already taken'})
    } else return next(err)
  }
};

// GET - /api/exercise/users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.Users.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};