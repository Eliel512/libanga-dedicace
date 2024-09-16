const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    try {
        const { content, post } = req.body;
        author = res.locals.userId;

        const newComment = new Comment({
            content,
            author,
            post
        });

        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id).populate('author');

        res.status(201).json({ message: 'Commentaire créé avec succès', comment: populatedComment });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du commentaire", details: error.message });
    }
};