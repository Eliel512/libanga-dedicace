const Message = require('../../models/message.model');

module.exports = async (req, res) => {
    try {
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });
        await message.save();
        res.status(201).json({ message: 'Message envoyé avec succès' });
    } catch (err) {
        res.status(500).json({
            error: 'Échec de l\'envoi du message', details: err.message });
    }
};