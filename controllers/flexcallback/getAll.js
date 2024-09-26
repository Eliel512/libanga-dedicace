const Flex = require('../../models/flexcallback.model');

module.exports = (req, res) => {
    Flex.find({  })
        .then(flex => res.status(200).json(flex))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Une erreur est survenue' })
        });
};