const {statusCodes} = require('../configs');
const {User} = require('../dataBase');

module.exports = {

    getUser: (req, res, next) => {
        try {
            const user = req.user;

            req.user = user.normalize();
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            req.users = users.map(user => user.normalize());
            res.json(req.users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await User.createUserWithHashPassword(req.body);

            req.user = createdUser.normalize();
            res.status(statusCodes.CREATED_201)
                .json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.deleteOne(req.user);

            res.sendStatus(statusCodes.NO_CONTENT_204);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {new: true});

            req.user = updatedUser.normalize();

            res.json(req.user)
                .status(statusCodes.CREATED_201);
        } catch (e) {
            next(e);
        }
    }

};
