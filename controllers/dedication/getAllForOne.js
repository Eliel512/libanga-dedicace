const Dedication = require('../../models/dedication.model');
const User = require('../../models/user.model');
const Event = require('../../models/event.model');

module.exports = (req, res) => {
    Dedication.find({ user: res.locals.userId })
        .populate({
            path: 'user',
            select: '_id name fname mname lname'
        })
        .populate({
            path: 'option'
        })
        .exec()
        .then(dedications => {
            const populatePromises = dedications.map(dedication => {
                const modelToUse = dedication.option.seller.model === 'event' ? Event : User;
                return Dedication.populate(dedication, {
                    path: 'option.seller.infos',
                    select: '_id name',
                    model: modelToUse
                });
            });

            Promise.all(populatePromises)
                .then(dedications => res.status(200).json(dedications))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        });
};