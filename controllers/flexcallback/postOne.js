const Flex = require('../../models/flexcallback.model');

module.exports = (req, res) => {
    const callback = new Flex({
        details: req.body
    });
    callback.save()
        .then(() => console.log('OK'))
        .catch(err => console.log(err));
};