const Joi = require('joi');

const querySchema = Joi.object({
    page: Joi.number().integer().positive().default(1).messages({
        'number.base': 'Le champ page doit être un nombre',
        'number.positive': 'Le champ page doit être un entier positif'
    }),
    limit: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Le champ limit doit être un nombre',
        'number.min': 'Le champ limit doit être un entier positif ou égal à zéro'
    }),
    kind: Joi.string().valid('artist', 'club', 'journalist', 'event', 'all').required().messages({
        'any.required': 'Le champ kind est requis',
        'any.only': 'Le champ kind doit être "user", "event", ou "all"'
    }),
    seller: Joi.string().optional()
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