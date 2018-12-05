const mongoose = require('../connect');
const Schema = mongoose.Schema;

const ordersSchema = Schema({

    idclient: String,
    idmenus: String,
    pagoTotal: String,
    lat: String,
    long: String,
    registerdate: Date

})

const orders = mongoose.model('orders', ordersSchema);

module.exports = orders;
