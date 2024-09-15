const Auth = require('./models/auth.model');

const kinds = ['artist', 'journalist', 'club', 'event'];

const createAdminAndUserAuth = async () => {
    try {
        const adminAuth = await Auth.findOne({ name: 'admin' });
        if (!adminAuth) {
            const adminPrivileges = kinds.map(kind => ({
                kind,
                permissions: ['write']
            }));
            const newAdmin = new Auth({
                name: 'admin',
                privileges: adminPrivileges
            });
            await newAdmin.save();
            console.log('Admin auth créé avec succès');
        } else {
            console.log('Admin auth existe déjà');
        }

        const userAuth = await Auth.findOne({ name: 'user' });
        if (!userAuth) {
            const userPrivileges = kinds.map(kind => ({
                kind,
                permissions: ['read']
            }));
            const newUser = new Auth({
                name: 'user',
                privileges: userPrivileges
            });
            await newUser.save();
            console.log('User auth créé avec succès');
        } else {
            console.log('User auth existe déjà');
        }
    } catch (error) {
        console.error('Erreur lors de la création des documents auth :', error);
    }
};

module.exports = createAdminAndUserAuth;