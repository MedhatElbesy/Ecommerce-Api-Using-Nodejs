
const {check} = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddelware');

exports.getBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('invalid category id format '),
        validatorMiddleware
];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Enter Category name ')
        .isLength({min :3})
        .withMessage('Too short name ')
        .isLength({max :32})
        .withMessage('Too long name'),
        validatorMiddleware
];

exports.updateBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage("Can't update invalid category id format ")
        .notEmpty()
        .withMessage("Must enter id to update"),
        validatorMiddleware
];

exports.deleteBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage("Can't delete invalid category id format ")
        .notEmpty()
        .withMessage("Must enter id to delete"),
        validatorMiddleware
];


