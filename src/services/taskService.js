const supabase = require('../db/supabase');

const getAllTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, description, completed, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

const createTask = async ({ title, description }) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title,
        description
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
const getTaskById = async (id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, description, completed, created_at')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select('id, title, description, completed, created_at')
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask
};