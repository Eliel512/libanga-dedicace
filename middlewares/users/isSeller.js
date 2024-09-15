const User = require('../../models/user.model');

const isSeller = async (req, res, next) => {
    try {
        const userId = res.locals.userId;

        const user = await User.findById(userId).populate('auth');

        if (!user) {
            return res.status(403).json({ message: 'Utilisateur non trouvé' });
        }
        if (user.kind) {
            return next();
        }

        if (user.auth) {
            const hasEventWriteAccess = user.auth.privileges.some(privilege =>
                privilege.kind === 'event' && privilege.permissions.includes('write')
            );

            if (hasEventWriteAccess) {
                return next();
            }
        }

        return res.status(403).json({
            message: 'Accès refusé : Vous devez avoir un champ "kind" ou des droits d\'écriture sur "event"'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la vérification des privilèges' });
    }
};

module.exports = isSeller;