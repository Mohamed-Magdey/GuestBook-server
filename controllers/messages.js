const db = require('../models');

exports.createMessage = async function(req, res, next) {
    try{
        let message = await db.Message.create({
            message: req.body.message,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate('user', {
            username: true
        });
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};