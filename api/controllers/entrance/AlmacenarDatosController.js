/**
 * AlmacenarDatosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	guardar: async function(req, res){
		var datos = req.body;
		var jugador;
		console.log("datos:");
		console.log(datos);
		if(datos.tipo == "jugador"){
			var cadena_jugador = datos.nombre_jugador;
		    var cadena_escuela = "No definida";
		    var cadena_room = "No definida";
		    var cadena_nombre = "No definida";

		    var arrayDeCadena = cadena_jugador.split("-", 3);
		    if (arrayDeCadena.length >= 3) {
			    cadena_escuela = arrayDeCadena[0];
			    cadena_room = arrayDeCadena[1];
			    cadena_nombre = arrayDeCadena[2];
			}
			var room = await Room.findOne({nombre:cadena_room});
			var escuela = await Escuela.findOne({codigo:cadena_escuela});

			console.log("escuela: " + cadena_escuela);
			console.log("room: " + cadena_room);
			console.log("nombre: " + cadena_nombre);
			if (!room || !escuela){
				console.log("Room o Escuela no existen");
				return res.status(400).send('room or school not exist');
			}

			var escuela_room = await Escuela_room.find({id_escuela:escuela.id, id_room:room.id});

			if (escuela_room.length <= 0) {
				console.log("Escuala no tiene permiso para ingresar al room " + room.nombre);
				return res.status(400).send('relation not exist');
			}

			jugador = await Jugador.findOne({nombre:cadena_nombre,id_escuela:escuela.id, id_room:room.id});

			if(!jugador){
				await Jugador.create({
					avatar: datos.avatar,
					nombre: cadena_nombre,
					id_room: room.id,
					id_escuela: escuela.id,
					puntos: 0,
					id_registro: 0
				})
				var jugador_actual = await Jugador.findOne({nombre:cadena_nombre,id_escuela:escuela.id, id_room:room.id});
				await Jugador.update({id:jugador_actual.id}).set({id_registro:jugador_actual.id});
				console.log("jugador guardado")
				console.log(jugador)
			} else {
				console.log("jugador ya registrado")
				console.log(jugador)
			}
		}

		if(datos.tipo == "juego"){
			var cadena_jugador = datos.id_registro;
			var arrayDeCadena = cadena_jugador.split("-", 3);
		    if (arrayDeCadena.length >= 3) {
			    cadena_escuela = arrayDeCadena[0];
			    cadena_room = arrayDeCadena[1];
			    cadena_nombre = arrayDeCadena[2];
			}
			var room = await Room.findOne({nombre:cadena_room});
			var escuela = await Escuela.findOne({codigo:cadena_escuela});

			var jugador = await Jugador.findOne({id_escuela:escuela.id,id_room:room.id,nombre:cadena_nombre});
			var juego = await Game.findOne({nombre:datos.nombre_juego});
			if(!juego){
				await Game.create({
					nombre: datos.nombre_juego,
					descripcion: datos.descripcion_juego
				})
				var juego = await Game.findOne({nombre:datos.nombre_juego}); 
				console.log("juego nuevo guardado")
				console.log(juego)
			}else{
				console.log("juego ya registrado")
				console.log(juego)
			}
			var capitulo = await Chapter.findOne({nombre:datos.nombre_capitulo,id_game:juego.id});
			if(!capitulo){
				var capitulo = await Chapter.create({
					nombre: datos.nombre_capitulo,
					descripcion: datos.descripcion_juego,
					id_game: juego.id
				})
				var capitulo = await Chapter.findOne({nombre:datos.nombre_capitulo,id_game:juego.id});
				console.log("capitulo nuevo guardado")
				console.log(capitulo)
			}else{
				console.log("capitulo ya registrado")
				console.log(capitulo)
			}
			var nivel = await Nivel.findOne({nombre:datos.nombre_nivel,id_chapter:capitulo.id});
			var learning_tmp = await Learning.findOne({nombre:datos.nombre_historia});	
			var id_learning_tmp = 0;		
			console.log("historia");
			console.log(learning_tmp);
			if (!learning_tmp) {
				console.log('No existe esa historia');
				
				//return res.status(400).send('No existe esa historia');
			} else id_learning_tmp = learning_tmp.id;;
			console.log("nombre: " + datos.nombre_historia);
			if(!nivel){
				var nivel = await Nivel.create({
					nombre: datos.nombre_nivel,
					descripcion: datos.descripcion_nivel,
					id_chapter: capitulo.id,
					id_learning: id_learning_tmp
				})
				var nivel = await Nivel.findOne({nombre:datos.nombre_nivel,id_chapter:capitulo.id});
				console.log("nivel nuevo guardado")
				console.log(nivel)
			}else{
				console.log("nivel ya registrado")
				console.log(nivel)
			}
			var nivel_jugado = await Nivel_usuario.findOne({id_usuario:jugador.id,id_nivel:nivel.id});
			if(!nivel_jugado){
				var nivel_jugado = await Nivel_usuario.create({
					id_usuario: jugador.id,
					id_nivel: nivel.id,
					fecha_inicio: datos.fecha_inicio,
					fecha_fin: datos.fecha_fin,
					tiempo_juego: datos.tiempo_juego,
					estado: datos.estado,
					correctas: datos.correctas,
					incorrectas: datos.incorrectas,
					intentos: 1
				})			
				var jugador = await Jugador.findOne({id:jugador.id});
				var puntaje = jugador.puntos + ((datos.correctas*3) - (datos.incorrectas));
				await Jugador.update({id:jugador.id}).set({puntos:puntaje});
				console.log("nuevos datos de jugador guardado con puntaje");
				console.log(jugador.puntos)
			} else {
				await Nivel_usuario.update({id_usuario:jugador.id,id_nivel:datos.id_nivel}).set({
					fecha_fin: datos.fecha_fin,
					tiempo_juego: datos.tiempo_juego,
					estado: datos.estado,
					correctas: datos.correctas,
					incorrectas: datos.incorrectas,
					intentos: nivel_jugado.intentos + 1
				})
				var jugador = await Jugador.findOne({id:jugador.id});
				var puntaje = jugador.puntos - ((nivel_jugado.correctas*3) - (nivel_jugado.incorrectas)) + ((datos.correctas*3) - (datos.incorrectas));
				await Jugador.update({id:jugador.id}).set({puntos:puntaje});
				console.log("actualizacion de datos de jugador")
				console.log(jugador.puntos)
			}
		}


		if(datos.tipo == "historia"){
			var cadena_jugador = datos.id_registro;
			var arrayDeCadena = cadena_jugador.split("-", 3);
		    if (arrayDeCadena.length >= 3) {
			    cadena_escuela = arrayDeCadena[0];
			    cadena_room = arrayDeCadena[1];
			    cadena_nombre = arrayDeCadena[2];
			}
			var room = await Room.findOne({nombre:cadena_room});
			var escuela = await Escuela.findOne({codigo:cadena_escuela});
			var jugador = await Jugador.findOne({id_escuela:escuela.id,id_room:room.id,nombre:cadena_nombre});
			console.log("Jugador");
			console.log(jugador);
			var juego = await Game.findOne({nombre:datos.nombre_juego});
			if(!juego){
				await Game.create({
					nombre: datos.nombre_juego,
					descripcion: datos.descripcion_juego
				})
				var juego = await Game.findOne({nombre:datos.nombre_juego}); 
				console.log("juego nuevo guardado")
				console.log(juego)
			}else{
				console.log("juego ya registrado")
				console.log(juego)
			}
			var capitulo = await Chapter.findOne({nombre:datos.nombre_capitulo,id_game:juego.id});
			if(!capitulo){

				var capitulo = await Chapter.create({
					nombre: datos.nombre_capitulo,
					descripcion: datos.descripcion_juego,
					id_game: juego.id
				})
				var capitulo = await Chapter.findOne({nombre:datos.nombre_capitulo,id_game:juego.id});
				console.log("capitulo nuevo guardado")
				console.log(capitulo)
			}else{
				console.log("capitulo ya registrado")
				console.log(capitulo)
			}
			var learning = await Learning.findOne({nombre:datos.nombre_historia,id_chapter:capitulo.id});
			if(!learning){
				var learning = await Learning.create({
					nombre: datos.nombre_historia,
					descripcion: datos.descripcion_historia,
					id_chapter: capitulo.id,
					duracion: datos.duracion
				})
				var learning = await Learning.findOne({nombre:datos.nombre_historia,id_chapter:capitulo.id});
				console.log("historia nuevo guardado")
				console.log(learning)
			}else{
				console.log("historia ya registrado")
				console.log(learning)
			}
			var learn_jugador = await Learn_jugador.findOne({id_jugador:jugador.id,id_learning:learning.id});
			if(!learn_jugador){
				var learn_jugador = await Learn_jugador.create({
					id_jugador: jugador.id,
					id_learning: learning.id,
					fecha_inicio: datos.fecha_inicio,
					fecha_fin: datos.fecha_fin,
					tiempo_juego: datos.tiempo_juego,
					estado: datos.estado,
					num_play: 1
				})	
				console.log("historia de jugador guardada")		
			} else {
				await Learn_jugador.update({id_jugador:jugador.id,id_learning:learning.id}).set({
					fecha_fin: datos.fecha_fin,
					tiempo_juego: datos.tiempo_juego,
					estado: datos.estado,
					num_play: learn_jugador.num_play + 1
				})
				console.log("historia de jugador actualizada")	
			}
		}
		if(datos.tipo == "activar_room"){
			var escuela_room = await Escuela_room.findOne({id_escuela:datos.idEscuela,id_room:datos.idRoom});
			if (!escuela_room) {
				await Escuela_room.create({
					id_escuela: datos.idEscuela,
					id_room: datos.idRoom,
					descripcion: "No definida",
				});
				console.log("Permiso de Escuela a Room creado");
			} else{
				console.log("Permiso ya registrado");
				console.log(escuela_room);
			}
			//await Room.update({id:datos.idRoom}).set({estado:datos.estado});
		}

		if(datos.tipo == "desactivar_room"){
			var escuela_room = await Escuela_room.findOne({id_escuela:datos.idEscuela,id_room:datos.idRoom});
			if (!escuela_room) {
				console.log("No existe la relacion");
				console.log(escuela_room);
			} else{
				await Escuela_room.destroy({id_escuela:datos.idEscuela,id_room:datos.idRoom});
				console.log("Relacion eliminada");
			}
			//await Room.update({id:datos.idRoom}).set({estado:datos.estado});
		}

		return res.status(200).send('ok');
	}
};

