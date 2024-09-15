const User = require('../../models/user.model');

const isAdmin = async (req, res, next) => {
    try {
        const userId = res.locals.userId;
        const user = await User.findById(userId).populate('auth');
        if (!user || !user.auth) {
            return res.status(403).json({ message: 'Utilisateur non autorisé' });
        }

        const adminPrivileges = user.auth.privileges.some(privilege =>
            privilege.kind === req.body.kind && privilege.permissions.includes('write')
        );

        if (!adminPrivileges) {
            return res.status(403).json({ message: 'Accès refusé: Privilèges d\'administrateur requis' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la vérification des privilèges' });
    }
};

module.exports = isAdmin;