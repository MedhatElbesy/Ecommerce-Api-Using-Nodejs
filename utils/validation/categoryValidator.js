const slugify = require('slugify');
const {check,body} = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddelware');

exports.getCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('invalid category id format '),
        validatorMiddleware
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Enter Category name ')
        .isLength({min :3})
        .withMessage('Too short name ')
        .isLength({max :32})
        .withMessage('Too long name')
        .custom((val , {req}) => {
        req.body.slug = slugify(val);
        return true
    }),
        validatorMiddleware
];

exports.updateCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage("Can't update invalid category id format ")
        .notEmpty()
        .withMessage("Must enter id to update"),
    body('name')
        .optional()
        .custom((val , {req}) => {
            req.body.slug = slugify(val);
            return true
        }),
        validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage("Can't delete invalid category id format ")
        .notEmpty()
        .withMessage("Must enter id to delete"),
        validatorMiddleware
];


