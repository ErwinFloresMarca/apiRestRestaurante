const mongoose = require('../connect');
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
    name: String,
    nit: String,
    owner: String,
    street: String,
    phone: String,
    log: String,
    lat: String,
    logo: String,
    registerdate: Date,
    picture: String,
    //menu: menuSchema
})

const restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = restaurant;
