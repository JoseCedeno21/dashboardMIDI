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
			var escenario, escuela, room;
		    var cadena_escuela = "No definida";
		    var cadena_escenario = "No definida";
		    var cadena_nombre = "No definida";

			var juego = await Game.findOne({nombre:datos.nombre_juego});
			var descripcion = "Agregar definicion";

		    var arrayDeCadena = cadena_jugador.split("-", 3);
		    if (arrayDeCadena.length >= 3) {
			    cadena_escuela = arrayDeCadena[0].toUpperCase();
			    cadena_escenario = arrayDeCadena[1].toUpperCase();
			    cadena_nombre = arrayDeCadena[2];

				console.log("escuela: " + cadena_escuela);
				console.log("escenario: " + cadena_escenario);
				console.log("nombre: " + cadena_nombre);
				
			} else {
				cadena_escuela = "ES000";
			    cadena_escenario = "R0";
			    cadena_nombre = cadena_jugador;
			}

			escenario = await Escenario.findOne({codigo:cadena_escenario});
			escuela = await Escuela.findOne({codigo:cadena_escuela});

			if (!escenario || !escuela){
				cadena_escuela = "ES000";
			    cadena_escenario = "R0";
			    cadena_nombre = cadena_jugador;
			    escenario = await Escenario.findOne({codigo:cadena_escenario});
				escuela = await Escuela.findOne({codigo:cadena_escuela});
			}
			//hasta aqui ya se define el escenario y la escuela, ambos existen

			if(!juego){
				await Game.create({
					nombre: datos.nombre_juego,
					descripcion: descripcion
				})
				var juego = await Game.findOne({nombre:datos.nombre_juego}); 
				console.log("juego nuevo guardado")
				console.log(juego)
			}else{
				console.log("juego ya registrado")
				console.log(juego)
			}

			room = await Room.findOne({id_escenario:escenario.id, id_escuela:escuela.id, id_juego:juego.id});
			

			if (!room){
				await Room.create({
					nombre: cadena_escenario,
					descripcion: descripcion,
					id_escenario: escenario.id,
					id_escuela: escuela.id,
					id_juego: juego.id
				})
				room = await Room.findOne({id_escenario:escenario.id, id_escuela:escuela.id, id_juego:juego.id});
				console.log("Room nuevo guardado")
				console.log(room)
			}else{
				console.log("Room ya registrado")
				console.log(room)
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
			// BUSCAR AL JUGADOR
			var cadena_jugador = datos.id_registro;
			var escenario, escuela, room;
		    var cadena_escuela = "No definida";
		    var cadena_escenario = "No definida";
		    var cadena_nombre = "No definida";

			var juego = await Game.findOne({nombre:datos.nombre_juego});
			var descripcion = "Agregar definicion";

		    var arrayDeCadena = cadena_jugador.split("-", 3);
		    if (arrayDeCadena.length >= 3) {
			    cadena_escuela = arrayDeCadena[0].toUpperCase();
			    cadena_escenario = arrayDeCadena[1].toUpperCase();
			    cadena_nombre = arrayDeCadena[2];
			} else {
				cadena_escuela = "ES000";
			    cadena_escenario = "R0";
			    cadena_nombre = cadena_jugador;
			}

			escenario = await Escenario.findOne({codigo:cadena_escenario});
			escuela = await Escuela.findOne({codigo:cadena_escuela});

			if (!escenario || !escuela){
				cadena_escuela = "ES000";
			    cadena_escenario = "R0";
			    cadena_nombre = cadena_jugador;
			    escenario = await Escenario.findOne({codigo:cadena_escenario});
				escuela = await Escuela.findOne({codigo:cadena_escuela});
			}
			//hasta aqui ya se define el escenario y la escuela, ambos existen

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

			room = await Room.findOne({id_escenario:escenario.id, id_escuela:escuela.id, id_juego:juego.id});
			
			if (!room){
				await Room.create({
					nombre: cadena_escenario,
					descripcion: descripcion,
					id_escenario: escenario.id,
					id_escuela: escuela.id,
					id_juego: juego.id
				})
				room = await Room.findOne({id_escenario:escenario.id, id_escuela:escuela.id, id_juego:juego.id});
				console.log("Room nuevo guardado")
				console.log(room)
			}else{
				console.log("Room ya registrado")
				console.log(room)
			}
			//FIN DE BUSCAR AL JUGADOR

			var jugador = await Jugador.findOne({id_room:room.id,nombre:cadena_nombre});

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
			var learning = await Learning.findOne({nombre:datos.nombre_historia});	
			console.log("historia");
			console.log(learning);

			if(!learning){
				var learning = await Learning.create({
					nombre: datos.nombre_historia,
					descripcion: "Por actualizar",
					id_chapter: capitulo.id,
					duracion: 0
				})
				var learning = await Learning.findOne({nombre:datos.nombre_historia,id_chapter:capitulo.id});
				console.log("historia nuevo guardado")
				console.log(learning)
			}else{
				console.log("historia ya registrado")
				console.log(learning)
			}

			console.log("nombre: " + datos.nombre_historia);
			if(!nivel){
				var nivel = await Nivel.create({
					nombre: datos.nombre_nivel,
					descripcion: datos.descripcion_nivel,
					id_chapter: capitulo.id,
					id_learning: learning.id
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
			// BUSCAR AL JUGADOR
			var cadena_jugador = datos.id_registro;
			var escenario, escuela, room;
		    var cadena_escuela = "No definida";
		    var cadena_escenario = "No definida";
		    var cadena_nombre = "No definida";

			var juego = await Game.findOne({nombre:datos.nombre_juego});
			var descripcion = "Agregar definicion";

		    var arrayDeCadena = cadena_jugador.split("-", 3);
		    if (arrayDeCadena.length >= 3) {
			    cadena_escuela = arrayDeCadena[0].toUpperCase();
			    cadena_escenario = arrayDeCadena[1].toUpperCase();
			    cadena_nombre = arrayDeCadena[2];
			} else {
				cadena_escuela = "ES000";
			    cadena_escenario = "R0";
			    cadena_nombre = cadena_jugador;
			}

			escenario = await Escenario.findOne({codigo:cadena_escenario});
			escuela = await Escuela.findOne({codigo:cadena_escuela});

			if (!escenario || !escuela){
				cadena_escuela = "ES000";
			    cadena_escenario = "R0";
			    cadena_nombre = cadena_jugador;
			    escenario = await Escenario.findOne({codigo:cadena_escenario});
				escuela = await Escuela.findOne({codigo:cadena_escuela});
			}
			//hasta aqui ya se define el escenario y la escuela, ambos existen

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

			room = await Room.findOne({id_escenario:escenario.id, id_escuela:escuela.id, id_juego:juego.id});
			
			if (!room){
				await Room.create({
					nombre: cadena_escenario,
					descripcion: descripcion,
					id_escenario: escenario.id,
					id_escuela: escuela.id,
					id_juego: juego.id
				})
				room = await Room.findOne({id_escenario:escenario.id, id_escuela:escuela.id, id_juego:juego.id});
				console.log("Room nuevo guardado")
				console.log(room)
			}else{
				console.log("Room ya registrado")
				console.log(room)
			}
			//FIN DE BUSCAR AL JUGADOR
			console.log(escuela.id)
			console.log(room.id)
			console.log(cadena_nombre)
			var jugador = await Jugador.findOne({id_escuela:escuela.id,id_room:room.id,nombre:cadena_nombre});
			console.log("Jugador");
			console.log(jugador);

			var capitulo = await Chapter.findOne({nombre:datos.nombre_capitulo,id_game:juego.id});
			if(!capitulo){

				var capitulo = await Chapter.create({
					nombre: datos.nombre_capitulo,
					descripcion: datos.descripcion_capitulo,
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
				await Learning.update({id:learning.id}).set({
					descripcion: datos.descripcion_historia,
					duracion: datos.duracion
				})
				console.log("historia ya registrado")
				console.log(learning)
			}
			console.log("pruebas");
			console.log(jugador);
			console.log(learning);
			var learn_jugador = await Learn_jugador.findOne({id_jugador:jugador.id,id_learning:learning.id});
			if(!learn_jugador){
				var estado_tmp = datos.estado.toLowerCase();
				var learn_jugador = await Learn_jugador.create({
					id_jugador: jugador.id,
					id_learning: learning.id,
					fecha_inicio: datos.fecha_inicio,
					fecha_fin: datos.fecha_fin,
					tiempo_juego: datos.tiempo_juego,
					estado: estado_tmp,
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
		return res.status(200).send('ok');
	}
};

