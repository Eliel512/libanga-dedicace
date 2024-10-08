const User = require('../../models/user.model');

module.exports = (req, res, next) => {
    const userId = res.locals.userId;

    User.findById(userId,
        '_id fname mname lname gender email address accountType favorites imageUrl createdAt updatedAt')
        .then(user => {
            if(!user){
                return res.status(500).json({ message: 'Une erreur est survenue' });
            }
            res.status(200).json({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                favorites: user.favorites,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                imageUrl: user.imageUrl
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};