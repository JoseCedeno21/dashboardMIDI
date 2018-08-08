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

function EfectividadMeta(correctas, incorrectas){
	return correctas / (correctas + incorrectas);
}

function CompletitudMeta(correctas, intentos){
	return correctas / (correctas + intentos);
}

function FrecuenciaIntentosMeta(intentos_ok, correctas_ok){
	return intentos_ok / correctas_ok;
}

function TiempoMeta(tiempo_juego_ok){
	return tiempo_juego_ok;
}
function EficienciaMeta(){
	return 0;
}
function EficienciaRelativaUsuario(){
	return 0;
}
function Accesibilidad(){
	return 0;
}
function Personalizacion(){
	return 0;
}
function SeguridadSaludJugador(){
	return 0;
}
function Daniosoftware(){
	return 0;
}
function EscalaSatisfaccion(){
	return 0;
}
function CuestionarioSatisfaccion(){
	return 0;
}
function PreferenciaUso(){
	return 0;
}
function Socializacion(){
	return 0;
}