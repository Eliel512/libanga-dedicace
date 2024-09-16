const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    message: Joi.string().min(10).required()
});

module.exports = async (req, res, next) => {
    const { name, email, phone, message } = req.body;
    const { error } = schema.validate({
        name,
        email,
        phone,
        message
    }, { abortEarly: false });

    if (error) {
        const validationErrors = error.details.map(err => err.message);
        return res.status(400).json({ errors: validationErrors });
    }
    next();
}