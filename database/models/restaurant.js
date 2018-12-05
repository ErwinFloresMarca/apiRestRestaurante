const mongoose = require('../connect');
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
    name: {
      type: String,
      required:[true,'debe introducir el nombre del restaurante']
    }
    nit: {
      type: String,
      required:[true,'debe intoducir el NIT']
    }
    owner: {
      type: String,
      required:[true,'introduzca el nombre de propietario']
    }
    street: {
      type: String,
      required:[true,'debe introducir la calle']
    }
    phone: String,
    log: String,
    lat: String,
    logo: String,
    registerdate: {
      type: Date,
      default: Date.now()
    }
    picture: String,
    //menu: menuSchema
})

const restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = restaurant;
