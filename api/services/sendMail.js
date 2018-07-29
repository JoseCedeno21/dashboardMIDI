module.exports.sendWelcomeMail = function(obj) {
	sails.log(obj);
	sails.hooks.email.send(
 		'welcomeEmail', 
 	{
	Name: 'jose',
	token: obj.token
 	},
 	{
 	to: 'jose.gabriell.21@gmail.com',
 	subject: 'Actualizar Contraseña'
 	},
 	function(err) {
 		if(err){
 			console.log(err);
 		} else {
 			console.log("correcto");
 		} 
 	})
}