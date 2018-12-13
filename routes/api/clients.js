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
          });
        } else {
          next();
        }
      });
  }
}




router.post("/login", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password  ;
  console.log(email,password);
  var result = CLIENT.findOne({email: email,password: sha1(password)}).exec((err, doc) => {
    if (err) {
      console.log("error");
      res.status(200).json({
        msn : "No se puede concretar con la peticion "
      });
      return;
    }
    if (doc) {
      //res.status(200).json(doc);
      jwt.sign({email: doc.email, password: sha1(doc.password)}, "seponeunallavesecreta", (err, token) => {
          console.log("sesion exitosa");
          res.status(200).json({
            token : token
          });
      })
    } else {
      console.log("error enviar token");
      res.status(200).json({
        msn : "El usuario no existe ne la base de datos"
      });
    }
  });
});
router.post("/", (req, res) => {
  var client = req.body;
  //Validacion de datosssss
  var firstname_reg = /\w{3,}/g
  var surname_reg = /\w{3,}/g
  var email_reg = /\w{1,}@[\w.]{1,}[.][a-z]{2,3}/g
  var phone_reg = /\d{7}[0-9]/g
  var ci_reg =/\d{1,}\w{1,3}/g
  var password_reg =/\w{6,}/g
  console.log(client);
  if(client.firstname.match(firstname_reg) == null){
    res.status(400).json({
      msn : "el nombre de usuario no es correcto"
    });
    return;
  }
  if(client.surname.match(surname_reg) == null){
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

  if(client.ci==undefined || client.ci.match(ci_reg) == null){
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
    firstname: client.firstname,
    surname: client.surname,
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
router.get("/",(req, res) => {
  
  CLIENT.find({}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});
router.patch('/:id', function (req, res, next) {
  let idUser = req.params.id;
  let userData = {};
  Object.keys(req.body).forEach((key) => {
      userData[key] = req.body[key];
  })

  CLIENT.findByIdAndUpdate(idUser, userData).exec((err, result) => {
      if (err) {
          res.status(500).json({
              error: err
          });
          return;
      }
      if (result) {
          res.status(200).json({
              message: "Se actualizaron los datos"

          })
      }
  })
});

router.delete('/:id', function (req, res, next) {
  let idUser = req.params.id;

  CLIENT.remove({
      _id: idUser
  }).exec((err, result) => {
      if (err) {
          res.status(500).json({
              error: err
          });
          return;
      }
      if (result) {
          res.status(200).json({
              message: "Usuario eliminado",
              result: result
          })
      }
  })
});

module.exports = router;
