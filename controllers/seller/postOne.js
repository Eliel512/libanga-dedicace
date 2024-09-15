const Artist = require('../../models/artist.model');
const Journalist = require('../../models/journalist.model');
const Club = require('../../models/club.model');
const Event = require('../../models/event.model');

module.exports = (req, res) => {
    switch(req.body.kind){
        case 'artist':
            const newArtist = new Artist({
                name: req.body.name,
                type: req.body.type,
                genres: req.body.genres,
                options: req.body.options,
                events: req.body.events
            });
            newArtist.save()
                .then(() => res.status(201).json(newArtist))
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ message: 'Une erreur est survenue' });
                });
            break;
        case 'journalist':
            const newJournalist = new Journalist({
                name: req.body.name,
                media: req.body.media,
                options: req.body.options
            });
            newJournalist.save()
                .then(() => res.status(201).json(newJournalist))
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ message: 'Une erreur est survenue' });
                });
            break;
        case 'club':
            const newClub = new Club({
                name: req.body.name,
                location: req.body.location,
                options: req.body.options,
                events: req.body.events
            });
            newClub.save()
                .then(() => res.status(201).json(newClub))
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ message: 'Une erreur est survenue' });
                });
            break;
        case 'event':
            const newEvent = new Event({
                date: req.body.date,
                options: req.body.options,
                title: req.body.title,
                ticketPrice: req.body.ticketPrice
            });
            newEvent.save()
                .then(() => res.status(201).json(newEvent))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Une erreur est survenue' });
                });
            break;
        default:
            return res.status(400).json({ message: 'Valeur \'kind\' incorrect' });
    }
};