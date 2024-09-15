const User = require('../../models/user.model');
const Event = require('../../models/event.model');

module.exports = (req, res) => {
    if(req.query.kind != 'event'){
        User.deleteOne({ _id: req.query.id, kind: {$and: [{ kind: req.query.kind }, { kind: { $exists: true } }] } })
            .then(() => res.status(200).json({ _id: req.query.id }))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Une erreur est survenue' });
            });
    }else{
        Event.deleteOne({ _id: req.query.id })
            .then(() => res.status(200).json({ _id: req.query.id }))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Une erreur est survenue' });
            });
    }
};