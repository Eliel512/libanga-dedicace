const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getValidationToken = require('../../utils/getValidationToken');

module.exports = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                auth: '66e724f886f3432a23dbc84e',
                password: hash
            });

            user.token = getValidationToken(user._id);

            user.save()
                .then(async () => {
                    try{
                        const userR = await User.populate(user, 'auth');
                        res.status(200).json({
                            _id: user._id,
                            fname: userR.fname,
                            lname: userR.lname,
                            email: userR.email,
                            auth: userR.auth,
                            imageUrl: userR.imageUrl,
                            favorites: userR.favorites,
                            createdAt: userR.createdAt,
                            updatedAt: userR.updatedAt,
                            token: jwt.sign(
                                { _id: userR._id },
                                process.env.TOKEN_KEY,
                                { expiresIn: '48h' }
                            )
                        });
                    }catch(err){
                        console.log(err);
                        return res.stauts(500).json({ message: 'Une erreur est survenue' });
                    }
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