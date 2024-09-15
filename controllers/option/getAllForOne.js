const Option = require('../../models/option.model');
const User = require('../../models/user.model');
const Event = require('../../models/event.model');

module.exports = (req, res) => {
    Option.find({ seller: req.query.seller })
        .then(options => {
            const populatePromises = options.map(option => {
                const modelToUse = option.seller.model === 'event' ? Event : User;
                return Option.populate(option, {
                    path: 'seller.infos',
                    select: '_id name',
                    model: modelToUse
                });
            });

            return Promise.all(populatePromises);
        })
        .then(optionsPopulated => res.status(200).json(optionsPopulated))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};