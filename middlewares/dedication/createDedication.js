const Dedication = require('../../models/dedication.model');

module.exports = (req, res, next) => {
    const dedication = new Dedication({
        user: res.locals.userId,
        dedicationText: req.body.dedicationText,
        option: req.body.option
    });
    res.locals.dedication = dedication;
    next();
};