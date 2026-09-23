const { body, validationResult } = require('express-validator');

const validateTask = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be 100 characters or less'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();
  }
];
const validateTaskUpdate = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title must be 100 characters or less'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    // Reject an empty update body
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: 'At least one field is required for update'
      });
    }

    next();
  }
];
module.exports = {
  validateTask,
  validateTaskUpdate
};