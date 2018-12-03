var express = require('express');
var router = express.Router();
var fs = require('fs');
var jwt = require("jsonwebtoken");

const DETAILS = require("../../database/models/details");
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

router.post("/", (req, res) => {
  var detail = req.body;
  //Validacion de datosssss

  var cantidad_reg = /\d{2}[0-9]/g


  if(detail.cantidad.match(cantidad_reg) == null||detail.cantidad.length>3){
    res.status(400).json({
      msn : "Cantidad no abastesida"
    });
    return;
  }
  var detailsdata = {
    idmenu: detail.idmenu,
    idorder: detail.idorder,
    cantidad: detail.cantidad,
    registerdate: new Date
  };
  //Validar ojo
  //client["registerdate"] = new Date();
  var det = new DETAILS(detailsdata);
  det.save().then((docs) => {
    res.status(200).json(docs);
  });
});
router.delete("", verifytoken, (req, res) => {
  //var url = req.url;
  var id = req.query.id;
  DETAILS.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});
router.get("/menus",(req,res)=>{
  var idm = req.query.idm;

  DETAILS.find({idmenu: idm}).exec((err,docs)=>{
    if(err){
      res.status(500).json({
        "msn":"Error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });

});
router.get("/orders",(req,res)=>{
  var ido = req.query.ido;

  DETAILS.find({idorder: idm}).exec((err,docs)=>{
    if(err){
      res.status(500).json({
        "msn":"Error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });

});
module.exports = router;
