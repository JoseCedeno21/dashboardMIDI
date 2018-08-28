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

		if(datos.tipo == "jugador"){
			var jugador = await Jugador.findOne({nombre:datos.nombre_jugador});
			if(!jugador){
				var jugador = await Jugador.create({
					avatar: datos.avatar,
					id_registro: datos.id_registro,
					nombre: datos.nombre_jugador,
					id_room: datos.id_room,
					puntos: 0
				})
				console.log("jugador guardado")
				console.log(jugador)
			} else {
				console.log("jugador ya registrado")
				console.log(jugador)
			}
		}

		if(datos.tipo == "juego"){
			var jugador = await Jugador.findOne({id_registro:datos.jugador_idregistro});
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
			if(!nivel){
				var nivel = await Nivel.create({
					nombre: datos.nombre_nivel,
					descripcion: datos.descripcion_nivel,
					id_chapter: capitulo.id
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
			var jugador = await Jugador.find({id_registro:datos.jugador_idregistro});
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
			var learn_jugador = await Learn_jugador.findOne({id_jugador:jugador[0].id,id_learning:learning.id});
			if(!learn_jugador){
				var learn_jugador = await Learn_jugador.create({
					id_jugador: jugador[0].id,
					id_learning: learning.id,
					fecha_inicio: datos.fecha_inicio,
					fecha_fin: datos.fecha_fin,
					tiempo_juego: datos.tiempo_juego,
					estado: datos.estado,
					num_play: 1
				})	
				console.log("historia de jugador guardada")		
			} else {
				await Learn_jugador.update({id_jugador:jugador[0].id,id_learning:learning.id}).set({
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

