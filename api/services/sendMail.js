module.exports.sendWelcomeMail = function(obj) {
	sails.log(obj);
	sails.hooks.email.send(
 		'welcomeEmail', 
 	{
	Name: 'jose',
	token: obj.token
 	},
 	{
 	to: 'jose.gabriel_21@hotmail.com',
 	subject: 'Welcome Email'
 	},
 	function(err) {
 		if(err){
 			console.log(err);
 		} else {
 			console.log("correcto");
 		} 
 	})
}