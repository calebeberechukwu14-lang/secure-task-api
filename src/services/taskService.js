const supabase = require('../db/supabase');

const getAllTasks = async (supabase) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, description, completed, created_at, user_id')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

const createTask = async (supabase, { title, description, userId }) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title,
        description,
        user_id: userId
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
const getTaskById = async (supabase, id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, description, completed, created_at, user_id')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
const updateTask = async (supabase, id, updates) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select('id, title, description, completed, created_at, user_id')
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
const deleteTask = async (supabase, id) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .select('id')
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
  updateTask,
  deleteTask
};