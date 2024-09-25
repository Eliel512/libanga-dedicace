const Dedication = require('../../models/dedication.model');
const Event = require('../../models/event.model');
const User = require('../../models/user.model');

module.exports = (req, res) => {
    Dedication.findOne({ _id: req.query.id })
        .populate({
            path: 'user',
            select: '_id name fname mname lname'
        })
        .populate({
            path: 'option'
        })
        .exec((err, dedication) => {
            if(err){
                console.log(err);
                return res.status(500).json({ message: 'Une erreur est survenue' });
            }
            if(dedication.user._id == res.locals.userId || dedication.option.seller.infos == res.locals.userId){
                const modelToUse = dedication.option.seller.model === 'event' ? Event : User;
                Dedication.populate(dedication, {
                    path: 'option.seller.infos',
                    select: '_id name kind type',
                    model: modelToUse
                })
                .exec((err, dedication) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: 'Une erreur est survenue' });
                    }
                    res.status(200).json(dedication);
                });
            }else{
                res.status(401).json({ message: 'Operation impossible' });
            }
        });
};