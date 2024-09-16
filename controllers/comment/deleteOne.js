const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "Le paramètre 'id' est requis." });
        }

        const deletedComment = await Comment.findByIdAndDelete(id).populate('author');

        if (!deletedComment) {
            return res.status(404).json({ error: "Commentaire non trouvé." });
        }

        res.status(200).json({ message: 'Commentaire supprimé avec succès', comment: deletedComment });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du commentaire", details: error.message });
    }
};