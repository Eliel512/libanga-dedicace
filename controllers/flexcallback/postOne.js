const Flex = require('../../models/flexcallback.model');

module.exports = (req, res) => {
    const callback = new Flex({
        details: req.body
    });
    callback.save()
        .catch(err => console.log(err));
};