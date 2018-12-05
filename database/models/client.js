const mongoose = require('../connect');
const Schema = mongoose.Schema;

const clientSchema = Schema({
    name: {
      type: String,
      required:[true,'debe poner un nombre']
    }
    email: {
      type: String,
      required:[true,'falta el email']
    }
    phone: {
      type: String,
      required:[true,'debe introducir el numero de telefono']
    }
    ci: {
      type: String,
      required:[true,'falta el CI']
    }
    password: {
      type: String,
      required:[true,'introduzaca contraseña']
    }
    registerdate: {
      type: Date,
      default: Date.now()
    }
});




const client = mongoose.model('client', clientSchema);

module.exports = client;
