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
//EFECTIVIDAD
function EfectividadMeta(correctas, incorrectas){ //relacion del total de respuestas correctas vs el total de intentos
	return correctas / (correctas + incorrectas);
}

function CompletitudMeta(n_completos, n_user){ //numero de usuarios que completaron vs numero de usuarios totales
	return n_completos / n_user;
}

function FrecuenciaIntentosMeta(intentos_ok, correctas_ok){ //numero de intentos en niveles completados vs numero de r. correctas en niveles completados
	return intentos_ok / correctas_ok;
}

//EFICIENCIA
function TiempoMeta(tiempo_juego_ok){ //Tiempo de juego en el nivel completado
	return tiempo_juego_ok;
}

function EficienciaMeta(correctas_ok, tiempo_juego){ //Respuestas correctas en un nivel completado vs tiempo que tomó completarlo
	return correctas_ok / tiempo_juego;
}

function EficienciaMetaPorIncorrectas(incorrectas_ok, tiempo_juego){ //Respuestas incorrectas en un nivel completado vs tiempo que tomó completarlo
	return incorrectas_ok / tiempo_juego;
}

function EficienciaRelativaUsuarioOK(cont_best_time, total_jugadores){ //Número de mejores jugadores vs total de jugadores
	return cont_best_time / total_jugadores;
}

function EficienciaRelativaUsuarioBAD(jugadores_BAD, total_jugadores){ //Número de jugadores que tuvieron dificultades vs total de jugadores
	return jugadores_BAD / total_jugadores;
}

//FLEXIBILIDAD
function AccesibilidadPorMetas(rooms, incorrectas){ //Número r. correctas en rooms distintas a las condiciones por defecto vs total de r. correctas por todos los rooms
	/*for(var i=0; i < rooms.length; i++){
		if (rooms.tipo == 'Default') {
			id_room_default.push(rooms.id);
			efectividad_default = EfectividadMeta(correctas, incorrectas) + efectividad_default;
		}
	}*/
	//return correctas / (correctas + incorrectas);
	return 0;
}

function AccesibilidadPorTiempo(t_rooms, t_total){ //Tiempo de rooms distintas a las condiciones por defecto vs total de tiempo por todos los rooms
	return t_rooms / t_total;
}

//SEGURIDAD
function SeguridadSaludJugador(){
	return 0;
}
function Daniosoftware(){
	return 0;
}

//SATISFACCION
function EscalaSatisfaccion(n_completos, n_usuarios){ //Número de usuarios que completaron el nivel vs total de usuarios de ese nivel
	return n_completos / n_usuarios;
}

function CuestionarioSatisfaccion(){
	return 0;
}

function PreferenciaUso(n_completos, n_usuarios, id_nivel, niveles){ //Escala de satisfaccion del nivel vs escala de satisfacción del resto de niveles
	var contador_usuarios = 0;
	var contador_completados = 0;
	var satisfaccion_nivel = EscalaSatisfaccion(n_completos, n_usuarios);
	var satisfaccion_general = -1;
	for(var i = 0; i < niveles; i++){
		if(niveles.id_nivel != id_nivel){
			contador_usuarios++;
			if (niveles.estado == "completado") {contador_completados++;}
		}
	}

	if (contador_usuarios != 0)  satisfaccion_general = EscalaSatisfaccion(contador_completados, contador_usuarios);
	return satisfaccion_nivel / satisfaccion_general;
}

function Socializacion(){
	return 0;
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