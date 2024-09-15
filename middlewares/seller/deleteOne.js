const Joi = require('joi');

const querySchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'L\'identifiant est requis',
        'string.base': 'L\'identifiant doit être une chaîne de caractères valide'
    }),
    kind: Joi.string().valid('artist', 'club', 'journalist', 'event').required().messages({
        'any.required': 'Le champ kind est requis',
        'any.only': 'Le champ kind doit être soit "user" soit "event"'
    })
});

const validateQuery = (req, res, next) => {
    const { error } = querySchema.validate(req.query, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ message: 'Données invalides', errors: errorMessages });
    }

    next();
};

module.exports = validateQuery;