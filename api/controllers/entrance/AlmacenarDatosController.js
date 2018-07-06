/**
 * AlmacenarDatosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  mostrar: function(req, res){
		sails.log("INFORMACION");
		sails.log(req.body);
		return res.status(200).send('ok');
	}
};

