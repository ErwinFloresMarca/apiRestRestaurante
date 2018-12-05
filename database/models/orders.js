const mongoose = require('../connect');
const Schema = mongoose.Schema;

const ordersSchema = Schema({

    idclient: String,
    idmenus: String,
    pagoTotal: String,
    lat: String,
    long: String,
    registerdate: {
      type: Date,
      default: Date.now()
    }

})

const orders = mongoose.model('orders', ordersSchema);

module.exports = orders;
