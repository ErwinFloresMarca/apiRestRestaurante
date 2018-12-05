var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var jwt = require("jsonwebtoken");
var sha1 = require('sha1');

const CLIENT = require("../../database/models/client");

var storage = multer.diskStorage({
  destination: "./public/restaurants",
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, "IMG_" + Date.now() + ".jpg");
  }
});
var upload = multer({
  storage: storage
}).single("img");
//verificacion verifytoken

//Middelware
function verifytoken (req, res, next) {
  //Recuperar el header
  const header = req.headers["authorization"];
  if (header  == undefined) {
      res.status(403).json({
        msn: "No autotizado"
      })
  } else {
      req.token = header.split(" ")[1];
      jwt.verify(req.token, "seponeunallavesecreta", (err, authData) => {
        if (err) {
          res.status(403).json({
            msn: "No autotizado"
          })
        } else {
          next();
        }
      });
  }
}




router.post("/login", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var result = CLIENT.findOne({email: email,password: password}).exec((err, doc) => {
    if (err) {
      res.status(200).json({
        msn : "No se puede concretar con la peticion "
      });
      return;
    }
    if (doc) {
      //res.status(200).json(doc);
      jwt.sign({name: doc.email, password: doc.password}, "seponeunallavesecreta", (err, token) => {
          console.log(err);
          res.status(200).json({
            token : token
          });
      })
    } else {
      res.status(200).json({
        msn : "El usuario no existe ne la base de datos"
      });
    }
  });
});
router.post("/", (req, res) => {
  var client = req.body;
  //Validacion de datosssss
  var name_reg = /\w{3,}/g
  var email_reg = /\w{1,}@[\w.]{1,}[.][a-z]{2,3}/g
  var phone_reg = /\d{7}[0-9]/g
  var ci_reg =/\d{1,}\w{1,3}/g
  var password_reg =/\w{6,}/g
  console.log(client);
  if(client.name.match(name_reg) == null){
    res.status(400).json({
      msn : "el nombre de usuario no es correcto"
    });
    return;
  }
  if(client.email.match(email_reg) == null){
    res.status(400).json({
      msn : "el email no es correcto"
    });
    return;
  }
  if(client.password.match(password_reg) == null){
    res.status(400).json({
      msn : "el password no es correcto requiere mas de 6 caracteres "
    });
    return;
  }

  if(client.ci.match(ci_reg) == null){
    res.status(400).json({
      msn : "el ci no puede estar vacio"
    });
    return;
  }
  if(client.phone.match(phone_reg) == null||client.phone.length!=8){
    res.status(400).json({
      msn : "el telefono es incorrecto"
    });
    return;
  }
  var clientdata = {
    name: client.name,
    email: client.email,
    phone: client.phone,
    ci: client.ci,
    password: sha1(client.password),
    registerdate: new Date
  };
  //Validar ojo
  client["registerdate"] = new Date();
  var cli = new CLIENT(clientdata);
  cli.save().then((docs) => {
    res.status(200).json(docs);
  });
});


module.exports = router;
