const Joi = require('joi');

const commentValidationSchema = Joi.object({
    content: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            'string.base': 'Le contenu doit être une chaîne de caractères.',
            'string.empty': 'Le contenu du commentaire ne peut pas être vide.',
            'string.min': 'Le commentaire doit contenir au moins 5 caractères.',
            'string.max': 'Le commentaire ne peut pas dépasser 500 caractères.',
            'any.required': 'Le contenu du commentaire est obligatoire.'
        }),
    author: Joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.pattern.base': "L'ID de l'auteur doit être un ObjectId valide.",
            'any.required': "L'ID de l'auteur est obligatoire."
        }),
    post: Joi.object({
        infos: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/)
            .messages({
                'string.pattern.base': "L'ID des infos doit être un ObjectId valide.",
                'any.required': "L'ID des infos est obligatoire."
            })
    }).required()
        .messages({
            'any.required': "Le champ 'post' est obligatoire."
        })
});

const validateComment = (req, res, next) => {
    const { content, post } = req.body;
    const { error } = commentValidationSchema.validate({
        content,
        author: res.locals.userId,
        post: { infos: post }
    }, { abortEarly: false });

    if (error) {
        const validationErrors = error.details.map(err => err.message);
        return res.status(400).json({ errors: validationErrors });
    }
    next();
};

module.exports = validateComment;