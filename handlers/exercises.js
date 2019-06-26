const db = require("../models");

// POST - /api/exercise/add
exports.addExercise = async (req, res, next) => {
  try {
    const user = await db.Users.findById(req.body.userId);
    
    if(!user) return next({status: 400, message: 'unknown _id'})
    
    const exercise = new db.Exercises(req.body)
    exercise.username = user.username
    
    const saveEx = await exercise.save();
    
    res.json({
      _id: saveEx.userId,
      description: saveEx.description,
      duration: saveEx.duration,
      date: saveEx.date.toDateString(),
      username: saveEx.username
    })
     
  } catch (err) {
    return next(err)
  }
};

// prefix - /api/exercise/log?{userId}[&from][&to][&limit]
// { } = required, [ ] = optional
exports.logExercises = async (req, res, next) => {
  try {
    const from = new Date(req.query.from)
    const to = new Date(req.query.to)
    const user = await db.Users.findById(req.query.userId);
    
    if(!user) return next({status: 400, message: 'unknown userId'})
    
    const exercises = await db.Exercises.find({
      userId: req.query.userId,
      date: {
        $lt: to == 'Invalid Date' ? Date.now() : to.getTime(),
        $gt: from == 'Invalid Date' ? 0 : from.getTime()
      }})
      .sort('-date')
      .limit(parseInt(req.query.limit));
  
    res.json({
      _id: req.query.userId,
      username: user.username,
      from : from == 'Invalid Date' ? undefined : from.toDateString(),
      to : to == 'Invalid Date' ? undefined : to.toDateString(),
      count: exercises.length,
      log: exercises.map(elm => ({
        description : elm.description,
        duration : elm.duration,
        date: elm.date.toDateString()
      }))
    })
     
  } catch (err) {
    return next(err)
  }
};
