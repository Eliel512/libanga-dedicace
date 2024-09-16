const Comment = require('../../models/comment.model');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Le paramètre 'id' du commentaire est requis." });
        }

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ error: "Commentaire non trouvé." });
        }

        if (comment.author.toString() != res.locals.userId) {
            return res.status(401).json({ error: "Vous n'êtes pas autorisé à modifier ce commentaire." });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la vérification de l'auteur du commentaire", details: error.message });
    }
};