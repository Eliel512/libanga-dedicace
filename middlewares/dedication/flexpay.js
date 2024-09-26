const axios = require('axios');
const Option = require('../../models/option.model');

module.exports = (req, res, next) => {
    Option.findOne({ _id: res.locals.dedication.option })
        .then(async option => {
            if(!option){
                return res.status(404).json({ message: 'Option introuvable' });
            }
            const { amount, currency } = option.price;
            try {
                const response = await axios.post(process.env.FLEXPAY_MOBILE_HOST, {
                    Authorization: 'Bearer ' + process.env.FLEXPAY_AUTH_TOKEN,
                    merchant: process.env.FLEXPAY_MERCHANT,
                    type: req.body.transactionType,
                    phone: req.body.phone,
                    reference: res.locals.dedication._id,
                    amount: amount,
                    currency: currency,
                    callbackUrl: process.env.FLEXPAY_CALLBACK_URL ||
                        process.env.RENDER_EXTERNAL_URL + '/flex-callback'
                },{
                    headers: { 'Authorization': 'Bearer ' + process.env.FLEXPAY_AUTH_TOKEN },
                });
                switch(response.data.code){
                    case '0':
                        res.locals.dedication.details = response.data;
                        next();
                        break;

                    case '1':
                        res.status(422).json({
                            message: 'Erreur lors de la transaction',
                            details: response.data
                        });
                        break;

                    default:
                        res.status(502).json({ message: 'Erreur lors de la transaction' });
                }
            }catch(err){
                console.log(err);
                res.status(502).json({ message: 'Erreur lors de la transaction' });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'Une erreur est survenue' });
        });
};