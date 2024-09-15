const Option = require('../../models/option.model');
const Event = require('../../models/event.model');
const User = require('../../models/user.model');

module.exports = (req, res) => {
    const option = new Option({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        seller: req.body.seller,
        options: req.body.options
    });

    option.save()
        .then(() => {
            const modelToUse = option.seller.model === 'event' ? Event : User;
            return Option.populate(option, {
                path: 'seller.infos',
                select: '_id name',
                model: modelToUse
            });
        })
        .then(() => res.status(201).json(option))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' });
        });
};