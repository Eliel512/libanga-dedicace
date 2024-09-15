const Joi = require('joi');

const optionSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Le champ name est requis',
    }),
    description: Joi.string().allow(null, '').optional(),
    price: Joi.number().positive().required().messages({
        'number.base': 'Le champ price doit être un nombre',
        'number.positive': 'Le champ price doit être positif',
    }),
    seller: Joi.object({
        model: Joi.string().valid('event', 'user').required(),
        infos: Joi.string().required().messages({
            'string.empty': 'Le champ infos du seller est requis',
        })
    }).required(),
    options: Joi.array().items(Joi.string()).optional()
});

const validateOption = (req, res, next) => {
    const { name, description, price, seller, options } = req.body;
    const { error } = optionSchema.validate({
        name: name,
        description: description,
        price: price,
        seller: seller,
        options: options
    }, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ message: 'Données invalides', errors: errorMessages });
    }

    next();
};

module.exports = validateOption;