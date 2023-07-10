const mongoose = require('mongoose');

const restSchema = new mongoose.Schema({
    
    name: String,

    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },
    menu: [
        {
            name: String,
            description: String,
            price: Number,
            image: String,
        },
    ],
});

const RestModel = mongoose.model('Restaurant', restSchema);

module.exports = {
    RestModel
}