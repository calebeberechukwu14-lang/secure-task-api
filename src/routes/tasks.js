const express = require('express');

const {
  getTasks,
  postTask,
  getTask,
  putTask,
  removeTask
} = require('../controllers/taskController');

const {
  validateTask,
  validateTaskUpdate
} = require('../middleware/taskValidation');

const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getTasks);

router.post('/', authenticate, validateTask, postTask);

router.get('/:id', authenticate, getTask);

router.put('/:id', authenticate, validateTaskUpdate, putTask);

router.delete('/:id', authenticate, removeTask);

module.exports = router;