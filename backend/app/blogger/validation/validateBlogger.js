import { body, validationResult } from "express-validator";

export const validateBlogger = [

    body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3})
    .withMessage('Title must be atleast 3 characters long'),

    // body('slug')
    // .notEmpty()
    // .withMessage('Slug is required')
    // .isSlug()
    // .withMessage('Slug must be URL-friendly (letters, numbers, dashes)'),

    body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be atleast 50m characters long'),

    // body('category')
    // .isEmpty()
    // .withMessage('Category is required')
    // .isString()
    // .withMessage('Category must be a valid string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]