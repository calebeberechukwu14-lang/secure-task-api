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

module.exports = validateTask;