const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    try {
        const { id, content } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Le paramètre 'id' est requis." });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true }).populate('author');

        if (!updatedComment) {
            return res.status(404).json({ error: "Commentaire non trouvé." });
        }

        res.status(200).json({ message: 'Commentaire mis à jour avec succès', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du commentaire", details: error.message });
    }
};