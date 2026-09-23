const {
  getAllTasks,
  createTask,
  getTaskById
} = require('../services/taskService');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks();

    res.json({
      tasks
    });
  } catch (error) {
    next(error);
  }
};


const postTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await createTask({
      title,
      description
    });

    res.status(201).json({
      task
    });
  } catch (error) {
    next(error);
  }
};
const getTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json({
      task
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  postTask,
  getTask
};