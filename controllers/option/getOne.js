const Option = require('../../models/option.model');
const User = require('../../models/user.model');
const Event = require('../../models/event.model');

module.exports = (req, res) => {
    Option.findOne({ _id: req.query.id })
        .then(option => {
            const modelToUse = option.seller.model === 'event' ? Event : User;
            return Option.populate(option, {
                path: 'seller.infos',
                select: '_id name',
                model: modelToUse
            });
        })
        .then(optionPopulated => res.status(200).json(optionPopulated))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};