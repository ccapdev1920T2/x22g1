const { check } = require('express-validator');
const Profile = require('../models/ProfileModel');

const validation = {
    signupValidation: function () {
        return [
            check('email')
                .isEmail()
                .withMessage('Please enter a valid email address')
                .bail()
                .trim()
                .normalizeEmail()
                .custom(async value => {
                    // check if email is already used
                    const data = await Profile.findOne({
                        email: value,
                    }).exec();
                    // reject if a record is found
                    if (data) return Promise.reject();
                })
                .withMessage('Email address is already in use'),
            check('password')
                .isLength({ min: 8 })
                .withMessage('Password should contain at least 8 characters')
                .notEmpty()
                .withMessage('Please enter a password'),
            check('passwordConfirm')
                .custom((value, { req }) => value === req.body.password)
                .withMessage('Passwords do not match')
                .notEmpty()
                .withMessage('Please enter a password'),
            check('fName')
                .notEmpty()
                .withMessage('Please enter your first name'),
            check('lName')
                .notEmpty()
                .withMessage('Please enter your last name'),
            check('username')
                .isLength({ min: 6 })
                .withMessage('Username should contain at least 6 characters')
                .notEmpty()
                .withMessage('Please enter a username')
                .custom(async value => {
                    // check if email is already used
                    const data = await Profile.findOne({
                        username: value,
                    }).exec();
                    // reject if a record is found
                    if (data) return Promise.reject();
                })
                .withMessage('Username is already in use'),
            check('bio')
                .notEmpty()
                .withMessage('Please enter a bio'),
        ];
    },
};

module.exports = validation;