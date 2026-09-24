const {
  registerUser,
  loginUser
} = require('../services/authService');

const register = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: 'Request body is required'
      });
    }

    const { email, password } = req.body;

    const data = await registerUser(email, password);

    res.status(201).json({
      message: 'Registration successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: 'Request body is required'
      });
    }

    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.json({
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};