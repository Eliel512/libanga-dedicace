const User = require('../../models/user.model');
const Event = require('../../models/event.model');

const handleError = (res, err) => {
    console.log(err);
    res.status(500).json({ message: 'Une erreur est survenue' });
};

const getPaginatedData = async (model, projection, page, limit, filter = {}) => {
    try {
        return await model.find(filter, projection)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('options events');
    } catch (err) {
        throw err;
    }
};

module.exports = async (req, res) => {
    const { page = 1, limit = 0, kind, seller } = req.query;
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    try {
        if (kind === 'all' || !kind) {
            const [users, events] = await Promise.all([
                getPaginatedData(User, { _id: 1, name: 1, genres: 1 }, parsedPage, parsedLimit, { kind: { $exists: true } }),
                getPaginatedData(Event, { _id: 1, title: 1, location: 1 }, parsedPage, parsedLimit)
            ]);
            return res.status(200).json([...users, ...events]);
        }

        const isEvent = kind === 'event';
        const model = isEvent ? Event : User;
        const projection = isEvent ? (seller ? { } : { _id: 1, title: 1, location: 1 }) :
            (seller ? { isValid: 0, token: 0, connected_at: 0, email: 0, password: 0, favorites: 0 } :
                { _id: 1, name: 1, genres: 1 });
        const filter = seller ? { _id: seller } : (isEvent ? {} : { kind: kind });

        const data = await getPaginatedData(model, projection, parsedPage, parsedLimit, filter);
        return res.status(200).json(data);
    } catch (err) {
        handleError(res, err);
    }
};