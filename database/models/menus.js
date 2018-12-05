const mongoose = require('../connect');
const Schema = mongoose.Schema;

const menusSchema = Schema({

    idrestaurant: String,
    name: {
      type: String,
      required:[true,'debe introducir el nobre del menu']
    }
    price: {
      type: String,
      required:[true,'introduzca el precio']
    }
    description: String,
    registerdate: {
      type: Date,
      default: Date.now()
    }
    picture: {
      type: String,
      required:[true,'falta una foto del menu']
    }
})
//Nombre, precio, descripción, fechaderegistro, fotografía del producto
const menus = mongoose.model('menus', menusSchema);

module.exports = menus;
