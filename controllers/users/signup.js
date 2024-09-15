const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getValidationToken = require('../../utils/getValidationToken');

module.exports = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                fname: req.body.fname,
                mname: req.body.middleName,
                lname: req.body.lname,
                email: req.body.email,
                accountType: req.body.accountType || 'buyer',
                password: hash
            });

            user.token = getValidationToken(user._id);

            user.save()
                .then(() => {
                    res.status(200).json({
                        _id: user._id,
                        fname: user.fname,
                        middleName: user.mname,
                        lname: user.lname,
                        gender: user.gender,
                        email: user.email,
                        address: user.address,
                        imageUrl: user.imageUrl,
                        favorites: user.favorites,
                        accountType: user.accountType,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        token: jwt.sign(
                            { _id: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '48h' }
                        )
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: 'Erreur interne du serveur' });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Erreur interne du serveur' })
        });
};