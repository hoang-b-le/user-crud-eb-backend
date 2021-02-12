import User from '../models/user.js';
import errorHandler from '../helpers/dbErrorHandler.js';

// registering a new user, creating a new object
export const registerUser = (req, res) => {
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: 'Successfully signed up!'
        });
    });
};

// this is mainly used to put the profile into req for the next() requests to use
export const findUserById = (req, res, next, id) => {
    console.log("Searching for " + id);
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        console.log("Found for " + id);
        next();
    });
};

export const getAllUsers = (req, res) => {
    User.find({}, function (err, users) {
        res.send(users);
    });
};


// already retrieved the user from the param and findUserById
export const findUserProfile = (req, res) => {
    // remove password and salt, keep only user data
    req.profile.hashedPassword = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// update user
export const updateUser = (req, res) => {
    let user = req.profile;
    console.log("Processing" + user + " and: " + req.body);
    user.name = req.body.name || user.name ;
    user.email = req.body.email || user.email ;
    // there is password validation as an object is inserted, no real password is saved, so this is just for placeholder
    user._password = "_placeholder_";
    console.log("Updating" + user);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: 'Successfully update user information!'
        });
    });
};

// already retrieved the user from the param and findUserById
export const deleteUser = (req, res, next) => {
    let user = req.profile;
    console.log("DELETE COMPLETED");
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        console.log("DELETE COMPLETED");
        deletedUser.hashedPassword = undefined;
        user.salt = undefined;
        res.json(user);
    });
};
