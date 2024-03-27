const slugify = require('slugify');
const {check,body} = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddelware');

exports.getsubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('invalid subCategory id format '),
        validatorMiddleware
];

exports.createsubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Enter subCategory name ')
        .isLength({min :2})
        .withMessage('Too short subCategory name ')
        .isLength({max :32})
        .withMessage('Too long subCategory name')
        .custom((val , {req}) => {
        req.body.slug = slugify(val);
        return true
    }),

    check('category')
        .notEmpty()
        .withMessage('Sub category must belong to category')
        .isMongoId()
        .withMessage('invalid Category id format'),
    validatorMiddleware
];

exports.updatesubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Enter subCategory name ')
        .isLength({min :2})
        .withMessage('Too short subCategory name ')
        .isLength({max :32})
        .withMessage('Too long subCategory name')
        .custom((val , {req}) => {
        req.body.slug = slugify(val);
        return true
    }),
    check('id')
        .isMongoId()
        .withMessage("Can't update invalid subCategory id format ")
        .notEmpty()
        .withMessage("Must enter id to update"),
        
        validatorMiddleware
];

exports.deletesubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage("Can't delete invalid subCategory id format ")
        .notEmpty()
        .withMessage("Must enter id to delete"),
        validatorMiddleware
];


