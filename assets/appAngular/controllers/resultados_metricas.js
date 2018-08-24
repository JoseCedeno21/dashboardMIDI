function pregunta1(){
	console.log("Pregunta 1: " + $scope.questions[m].pregunta + " - con ID: " + $scope.questions[m].id);
	
	var t_play_status = "", num_try_status = "", completado = false;

	for(var i=0; i<$scope.level.length; i++){
		t_play_prom = t_play_prom + $scope.level[i].tiempo_juego;
		num_try_prom = num_try_prom + $scope.level[i].intentos;
		t_play[i] = $scope.level[i].tiempo_juego;
		num_try[i] = $scope.level[i].intentos;
		if ($scope.level[i].estado == "completado") {completado = true;}
	}
	if (completado) {
	//TIEMPO JUGADO
		t_play_prom = t_play_prom / $scope.level.length;
		q_mid = numbers.statistic.quantile(t_play, 2, 4);
		
		if (t_play_prom <= q_mid) t_play_status = "ALTO";
		else t_play_status = "BAJO";
		console.log("Promedio de juego: " + t_play_prom);
		console.log("Cuartil 2: " + q_mid);
		console.log("Status: " + t_play_status);
		
		//INTENTOS
		num_try_prom = num_try_prom / $scope.level.length;
		q_mid = numbers.statistic.quantile(num_try, 2, 4);
		
		if (num_try_prom <= q_mid) num_try_status = "ALTO";
		else num_try_status = "BAJO";
		console.log("Promedio de intentos: " + num_try_prom);
		console.log("Cuartil 2: " + q_mid);
		console.log("Status: " + num_try_status);
	}
	//RESPUESTA
	if (t_play_status == "ALTO" && t_play_status == "ALTO") $scope.questions[0].respuesta = "Si es divertido";
	else $scope.questions[1].respuesta = "Normal";
	console.log("Supuesta respuesta: " + $scope.questions[0].respuesta);
}

//EFICIENCIA
//Tiempo de meta (id: 1)
function TiempoMeta(tiempo_juego_ok){ //Tiempo de juego en el nivel completado
	return tiempo_juego_ok;
}
//Eficiencia de meta por respuestas correctas (id: 2)
function EficienciaMeta(correctas_ok, tiempo_juego){ //Respuestas correctas en un nivel completado vs tiempo que tomó completarlo
	if (tiempo_juego == 0) return 0;
	return correctas_ok / tiempo_juego;
}
//Eficiencia de meta por respuestas incorrectas (id: 3)
function EficienciaMetaPorIncorrectas(incorrectas_ok, tiempo_juego){ //Respuestas incorrectas en un nivel completado vs tiempo que tomó completarlo
	return incorrectas_ok / tiempo_juego;
}
//Eficiencia relativa a los mejores resultados de jugadores (id: 4)
function EficienciaRelativaUsuarioOK(cont_best_time, total_jugadores){ //Número de mejores jugadores vs total de jugadores
	return (cont_best_time / total_jugadores) * 100;
}
//Eficiencia relativa a los jugadores con dificultades en el nivel (id: 5)
function EficienciaRelativaUsuarioBAD(jugadores_BAD, total_jugadores){ //Número de jugadores que tuvieron dificultades vs total de jugadores
	return (jugadores_BAD / total_jugadores) * 100;
}

//EFECTIVIDAD
//Efectividad de la meta (id: 6)
function EfectividadMeta(correctas, incorrectas){ //relacion del total de respuestas correctas vs el total de intentos
	if ((correctas + incorrectas) == 0) return 0;
	return (correctas / (correctas + incorrectas)) * 100;
}
//Completitud de la meta (id: 7)
function CompletitudMeta(n_completos, n_user){ //numero de usuarios que completaron vs numero de usuarios totales
	return (n_completos / n_user) * 100;
}
//Frecuencia de intentos para llegar a la meta (id: 8)
function FrecuenciaIntentosMeta(intentos_ok, correctas_ok){ //numero de intentos en niveles completados vs numero de r. correctas en niveles completados
	return intentos_ok;
}

//FLEXIBILIDAD
//Accecibilidad por metas (id: 9)
function AccesibilidadPorMetas(rooms_default, rooms_rest, level, jugadores_room_default, jugadores_room_rest){ //Número r. correctas en rooms distintas a las condiciones por defecto vs total de r. correctas por todos los rooms
	var nivel_usuario_default = [];
	var intentos_OK = 0, correctas_OK = 0, incorrectas_OK = 0, n_user_OK = 0;

	var efectividad_default = 0, efectividad_rest = 0, efectividad_room = 0, diferencia = 0;

	//CALCULO DE LA EFECTIVIDAD DEL ROOM POR DEFAULT
	for(var i = 0; i < level.length; i++){
		for(var j = 0; j < jugadores_room_default.length; j++){
			if(level[i].id_usuario == jugadores_room_default[j].id){
				nivel_usuario_default.push(level[i]);
			}
		}
	}

	for(var i = 0; i < nivel_usuario_default.length; i++){
		if (nivel_usuario_default[i].estado == "completado") {
			intentos_OK = intentos_OK + nivel_usuario_default[i].intentos;
			correctas_OK = correctas_OK + nivel_usuario_default[i].correctas;
			incorrectas_OK = incorrectas_OK + nivel_usuario_default[i].incorrectas;
			n_user_OK++;
		}
	}

	intentos_OK = intentos_OK / n_user_OK;
	correctas_OK = correctas_OK / n_user_OK;
	incorrectas_OK = incorrectas_OK / n_user_OK;

	efectividad_default = EfectividadMeta(correctas_OK, incorrectas_OK) / 100;

	//FIN DEL CALCULO DE LA EFECTIVIDAD DEL ROOM POR DEFAULT

	//Efectividad del resto de rooms
	for(var i = 0; i < rooms_rest.length; i++){
		intentos_OK = 0;
		correctas_OK = 0;
		incorrectas_OK = 0;
		n_user_OK = 0;
			
		for(var j = 0; j < jugadores_room_rest.length; j++){ //barrido de jugadores del room
			for(var k = 0; k < level.length; k++){ // Busca los datos de nivel_usuario para sumar sus intentos, correctas e incorrectas
				if (jugadores_room_rest[j].id == level[k].id_usuario && level[k].estado == "completado") {
					intentos_OK = intentos_OK + level[k].intentos;
					correctas_OK = correctas_OK + level[k].correctas;
					incorrectas_OK = incorrectas_OK + level[k].incorrectas;
					n_user_OK++;
					break;
				}
			}
		}
		
		if (n_user_OK == 0) n_user_OK = -1;
	
		intentos_OK = intentos_OK / n_user_OK;
		correctas_OK = correctas_OK / n_user_OK;
		incorrectas_OK = incorrectas_OK / n_user_OK;
		efectividad_rest = EfectividadMeta(correctas_OK, incorrectas_OK) / 100;

		diferencia = efectividad_default - efectividad_rest;
		if (diferencia < 0) diferencia = diferencia * (-1);
		efectividad_room = efectividad_room + diferencia;
	}

	efectividad_room = efectividad_room / rooms_rest.length;

	return efectividad_room;
}
//Accesibilidad por tiempo (id: 10)
function AccesibilidadPorTiempo(rooms_default, rooms_rest, level, jugadores_room_default, jugadores_room_rest){ //Tiempo de rooms distintas a las condiciones por defecto vs total de tiempo por todos los rooms
	var nivel_usuario_default = [];
	var correctas_OK = 0, tiempo_OK = 0, n_user_OK = 0;

	var eficiencia_default = 0, eficiencia_rest = 0, eficiencia_room = 0, diferencia = 0;

	//CALCULO DE LA EFECTIVIDAD DEL ROOM POR DEFAULT
	for(var i = 0; i < level.length; i++){
		for(var j = 0; j < jugadores_room_default.length; j++){
			if(level[i].id_usuario == jugadores_room_default[j].id){
				nivel_usuario_default.push(level[i]);
			}
		}
	}

	for(var i = 0; i < nivel_usuario_default.length; i++){
		if (nivel_usuario_default[i].estado == "completado") {
			correctas_OK = correctas_OK + nivel_usuario_default[i].correctas;
			tiempo_OK = tiempo_OK + nivel_usuario_default[i].tiempo_juego;
			n_user_OK++;
		}
	}

	correctas_OK = correctas_OK / n_user_OK;
	tiempo_OK = tiempo_OK / n_user_OK;

	eficiencia_default = EficienciaMeta(correctas_OK, tiempo_OK);

	//FIN DEL CALCULO DE LA EFECTIVIDAD DEL ROOM POR DEFAULT

	//Efectividad del resto de rooms
	for(var i = 0; i < rooms_rest.length; i++){
		correctas_OK = 0;
		tiempo_OK = 0;
		n_user_OK = 0;
			
		for(var j = 0; j < jugadores_room_rest.length; j++){ //barrido de jugadores del room
			for(var k = 0; k < level.length; k++){ // Busca los datos de nivel_usuario para sumar sus tiempos y correctas
				if (jugadores_room_rest[j].id == level[k].id_usuario && level[k].estado == "completado") {
					correctas_OK = correctas_OK + level[k].correctas;
					tiempo_OK = tiempo_OK + level[k].tiempo_juego;
					n_user_OK++;
					break;
				}
			}
		}
		
		if (n_user_OK == 0) n_user_OK = -1;
	
		correctas_OK = correctas_OK / n_user_OK;
		tiempo_OK = tiempo_OK / n_user_OK;
		eficiencia_rest = EficienciaMeta(correctas_OK, tiempo_OK);

		diferencia = eficiencia_default - eficiencia_rest;
		if (diferencia < 0) diferencia = diferencia * (-1);
		eficiencia_room = eficiencia_room + diferencia;
	}

	eficiencia_room = eficiencia_room / rooms_rest.length;

	return eficiencia_room;
}

//SATISFACCION

//Preferencias de uso con respecto del nivel vs el resto de niveles (id: 11)
function PreferenciaUso(n_completos, nivel, niveles, level_users){ //Escala de completitud de meta del nivel vs escala completitud de meta del resto de niveles
	//Se usa la relacion de usuarios que completaron el nivel vs el numero total de usuarios, denota que usuarios terminaron el nivel vs los que abandonaron
	var completitud_nivel = 0;
	var id_nivel = nivel[0].id_nivel;
	var n_nivel_OK = 0, n_nivel = 0;
	var diferencia = 0;
	var eficiencia_nivel = 0;
	
	completitud_nivel = CompletitudMeta(n_completos, nivel.length) / 100;

	
	for(var i=0; i < niveles.length; i++){
		for(var j=0; j < level_users.length; j++){
			if(level_users[j].id_nivel == niveles[i].id){
				if(level_users[j].estado == "completado") n_nivel_OK++;
				n_nivel++;
			}
		}
		//promedio de un nivel
		diferencia = completitud_nivel - CompletitudMeta(n_nivel_OK, n_nivel) / 100;
		eficiencia_nivel = eficiencia_nivel + diferencia;
	}

	eficiencia_nivel = eficiencia_nivel / (niveles.length - 1);

	return eficiencia_nivel * 100;
}


//LEARNING
function ComprensionDialogos(){
	return 0;
}

function SatisfaccionLearning(){
	return 0;
}

function IntuitivoLearning(){
	return 0;
}


//Funciones estadísticas
function quartile(arr, k, q) {
	var sorted, count, index;

	if(k === 0) return Math.min.apply(null, arr);

	if (k === q) return Math.max.apply(null, arr);

	sorted = arr.slice(0);
	sorted.sort(function (a, b) { return a - b; });
	count = sorted.length;
	index = count * k / q;

	if (index % 1 === 0) return 0.5 * sorted[index - 1] + 0.5 * sorted[index];

	return sorted[Math.floor(index)];
}