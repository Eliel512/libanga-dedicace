const Joi = require('joi');

const artistSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).required(),
    options: Joi.array().items(Joi.string()),
    events: Joi.array().items(Joi.string())
});

const journalistSchema = Joi.object({
    name: Joi.string().required(),
    media: Joi.string().required(),
    options: Joi.array().items(Joi.string())
});

const clubSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    options: Joi.array().items(Joi.string()),
    events: Joi.array().items(Joi.string())
});

const eventSchema = Joi.object({
    date: Joi.date().required(),
    title: Joi.string().required(),
    options: Joi.array().items(Joi.string()),
    ticketPrice: Joi.number().required()
});

const validateBody = (req, res, next) => {
    const { kind } = req.body;

    let schema;
    let sellerObj;

    switch (kind) {
        case 'artist':
            schema = artistSchema;
            sellerObj = {
                name: req.body.name,
                type: req.body.type,
                genres: req.body.genres,
                options: req.body.options,
                events: req.body.events
            };
            break;
        case 'journalist':
            schema = journalistSchema;
            sellerObj = {
                name: req.body.name,
                media: req.body.media,
                options: req.body.options
            };
            break;
        case 'club':
            schema = clubSchema;
            sellerObj = {
                name: req.body.name,
                location: req. body.location,
                options: req.body.options,
                events: req.body.events
            };
            break;
        case 'event':
            schema = eventSchema;
            sellerObj = {
                date: req.body.date,
                title: req.body.title,
                options: req.body.options,
                ticketPrice: req.body.ticketPrice
            };
            break;
        default:
            return res.status(400).json({ message: 'Valeur \'kind\' incorrecte' });
    }

    const { error } = schema.validate(sellerObj, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ message: 'Données invalides', errors: errorMessages });
    }

    next();
};

module.exports = validateBody;