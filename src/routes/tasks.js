const express = require('express');

const {
  getTasks,
  postTask,
  getTask
} = require('../controllers/taskController');

const validateTask = require('../middleware/taskValidation');

const router = express.Router();

router.get('/', getTasks);

router.post('/', validateTask, postTask);

router.get('/:id', getTask);

module.exports = router;