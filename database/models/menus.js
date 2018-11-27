const mongoose = require('../connect');
const Schema = mongoose.Schema;

const menusSchema = Schema({

    idrestaurant: String,
    name: String,
    price: String,
    description: String,
    registerdate: Date,
    picture: String
})
//Nombre, precio, descripción, fechaderegistro, fotografía del producto
const menus = mongoose.model('menus', menusSchema);

module.exports = menus;
