const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
} = require('../services/taskService');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks(req.supabase);

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

    const task = await createTask(req.supabase, {
      title,
      description,
      userId: req.user.id
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
    const task = await getTaskById(req.supabase, req.params.id);

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

const putTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const updates = {};

    if (title !== undefined) {
      updates.title = title;
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (completed !== undefined) {
      updates.completed = completed;
    }

    const task = await updateTask(
      req.supabase,
      req.params.id,
      updates
    );

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

const removeTask = async (req, res, next) => {
  try {
    const task = await deleteTask(req.supabase, req.params.id);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  postTask,
  getTask,
  putTask,
  removeTask
};