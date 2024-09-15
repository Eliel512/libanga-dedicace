const Dedication = require('../../models/dedication.model');
const Event = require('../../models/event.model');
const User = require('../../models/user.model');

module.exports = (req, res) => {
    const dedication = new Dedication({
        user: res.locals.userId,
        dedicationText: req.body.dedicationText,
        option: req.body.option
    });

    dedication.save()
        .then(dedication => {
            return Dedication.populate(dedication, [{
                path: 'user',
                select: '_id name fname mname lname'
            }, {
                path: 'option'
            }]);
        })
        .then(dedication => {
            const modelToUse = dedication.option.seller.model === 'event' ? Event : User;
            return Dedication.populate(dedication, {
                path: 'option.seller.infos',
                select: '_id name kind type',
                model: modelToUse
            });
        })
        .then(dedication => res.status(201).json(dedication))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};