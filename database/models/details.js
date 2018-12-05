const mongoose = require('../connect');
const Schema = mongoose.Schema;

const detailsSchema = Schema({
    idmenu: String,
    idorder: String,
    cantidad: Number,
    registerdate: {
      type: Date,
      default: Date.now()
    }
    //menu: menuSchema
})

const details = mongoose.model('details', detailsSchema);

module.exports = details;
