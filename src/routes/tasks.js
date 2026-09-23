const express = require('express');

const {
  getTasks,
  postTask,
  getTask,
  putTask
} = require('../controllers/taskController');

const {
  validateTask,
  validateTaskUpdate
} = require('../middleware/taskValidation');

const router = express.Router();

router.get('/', getTasks);

router.post('/', validateTask, postTask);

router.get('/:id', getTask);

router.put('/:id', validateTaskUpdate, putTask);

module.exports = router;