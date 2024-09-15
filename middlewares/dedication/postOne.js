const Joi = require('joi');

const dedicationSchema = Joi.object({
    dedicationText: Joi.string().required(),
    option: Joi.string().required()
});

const validateDedicationBody = (req, res, next) => {
    const { error } = dedicationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ message: 'Données invalides', errors: errorMessages });
    }

    next();
};

module.exports = validateDedicationBody;