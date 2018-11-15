var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respondiendo mi primer get ----!!');
});

router.post('/divisas', function(req, res, next) {
	var body=req.body;
	var valorCad = body.valor;

	var tipoCambio= body.tipoCambio;

	if (valorCad == '' || tipoCambio == '' || valorCad == undefined || tipoCambio == undefined) {
		res.status(400).json(/*{msn : "Error en las variables"}*/);
	}
	var valor=parseFloat(valorCad);
	switch(tipoCambio){
		case 'Boliviano': res.status(200).json( { Bolivianos: (valor/0.14)} );
				break;
		case 'bitcoin': res.status(200).json( { bitcoin: (valor/6605.13)} );
				break;
		case 'Peso chileno': res.status(200).json( { 'Peso chileno': (valor/0.0015)} );
				break;
		case 'Peso Argentino': res.status(200).json( { 'Peso Argentino': (valor/0.025)} );
				break;
		case 'Euro': res.status(200).json( { Euro: (valor/1.17)} );
				break;
		default: res.status(200).json({msn : "no se encontro el tipo de cambio"});
	}

});

module.exports = router;
