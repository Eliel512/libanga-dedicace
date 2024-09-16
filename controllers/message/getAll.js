const Message = require('../../models/message.model');

module.exports = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        try {
            const messages = await Message.find().sort({ createdAt: -1 });
            res.status(200).json({ messages });
        } catch (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des messages', details: err.message });
        }
    }else{
        try {
            const message = await ContactMessage.findById(id);
            if (!message) {
                return res.status(404).json({ error: "Message introuvable." });
            }
            res.status(200).json({ message });
        } catch (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération du message', details: err.message });
        }
    }
};