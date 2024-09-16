const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    const { type } = req.query;

    switch (type) {
        case 'id':
            try {
                const { id } = req.body;
                if (!id) {
                    return res.status(400).json({ error: "Le paramètre 'id' est requis." });
                }

                const comment = await Comment.findById(id).populate('author');

                if (!comment) {
                    return res.status(404).json({ error: "Commentaire non trouvé." });
                }

                res.status(200).json({ comment });
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération du commentaire", details: error.message });
            }
            break;
        case 'author':
            try {
                const { author } = req.query;

                if (!author) {
                    return res.status(400).json({ error: "Le paramètre 'author' est requis." });
                }

                const comments = await Comment.find({ author: author }).populate('author');

                res.status(200).json({ comments });
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des commentaires", details: error.message });
            }
            break;
        case 'post':
            try {
                const { post } = req.query;

                if (!post) {
                    return res.status(400).json({ error: "Le paramètre 'post' est requis." });
                }

                const comments = await Comment.find({ 'post.infos': post }).populate('author');

                res.status(200).json({ comments });
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des commentaires", details: error.message });
            }
            break;
        default:
            res.status(400).json({ message: 'type incorrect' });
    }
};