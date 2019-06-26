const express = require('express');
const {createUser, getUsers} = require('../handlers/users');
const {addExercise, logExercises} = require('../handlers/exercises');
const router = express.Router();


// prefix - /api/exercise/new-user
router.route('/new-user')
  .post(createUser);

// prefix - /api/exercise/users
router.route('/users')
  .get(getUsers)

// prefix - /api/exercise/add
router.route('/add')
  .post(addExercise);

// prefix - /api/exercise/log
router.route('/log')
  .get(logExercises);

module.exports = router;