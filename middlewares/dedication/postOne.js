const Joi = require('joi');

const dedicationSchema = Joi.object({
    dedicationText: Joi.string().required(),
    option: Joi.string().required()
});

module.exports = (req, res, next) => {
    const { dedicationText, option } = req.body;
    const { error } = dedicationSchema.validate({
        dedicationText,
        option
    }, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ message: 'Données invalides', errors: errorMessages });
    }
    next();
};