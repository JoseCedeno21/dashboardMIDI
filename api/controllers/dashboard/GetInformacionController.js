/**
 * GetInformacionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  datos: async function(req, res){
  	var game = {};
  	game = await Game.findOne({id:req.params.id});
  	var chapters = await Chapter.find({id_game:game.id});
  	game.chapters = [];
  	for(var j=0; j<chapters.length; j++){  		
  		game.chapters.push(chapters[j]);
  		var niveles = await Nivel.find({id_chapter:chapters[j].id});
  		game.chapters[j].niveles = [];
  		game.chapters[j].niveles.push(niveles);
  		for(var i=0; i<niveles.length; i++){		
  			var nivel_usuario = await Nivel_usuario.find({id_nivel:niveles[i].id})
  			game.chapters[j].niveles[0][i].datos = [];
  			game.chapters[j].niveles[0][i].datos.push(nivel_usuario);
  		}
  		var learning = await Learning.findOne({id_chapter:chapters[j].id});
  		game.chapters[j].learning = [];
  		game.chapters[j].learning.push(learning);
  		//console.log(learning)
  		var learn_jugador = await Learn_jugador.find({id_learning:learning.id});
  		//console.log("ahora el learn")
  		//console.log(learn_jugador)
  		game.chapters[j].learning[0].datos = [];
  		game.chapters[j].learning[0].datos.push(learn_jugador);
  	}
  	res.json(game);
  },

  cantidades: async function(req, res){
  	var room = await Room.count();
  	var game = await Game.count();
  	var nivel = await Nivel.count();
  	var jugador = await Jugador.count();
  	var chapter = await Chapter.count();
  	var cantidades = {
  		room: room,
  		game: game,
  		nivel: nivel,
  		jugador: jugador,
  		chapter: chapter
  	};
  	res.json(cantidades);
  },

  games: async function(req, res){
  	var game = await Game.find();
  	res.json(game);
  },

  niveles: async function(req, res){
    var nivel = await Nivel.find();
    res.json(nivel);
  },

  nivel: async function(req, res){
    var nivel = await Nivel.find({id:req.params.id});
    res.json(nivel);
  },

  rooms: async function(req, res){
  	var room = await Room.find();
  	res.json(room);
  },

  jugadores: async function(req, res){
    var jugadores = await Jugador.find();
    for(var i=0; i<jugadores.length; i++){
      jugadores[i].cantidad = {};
      var cantidad = await Nivel_usuario.count({id_usuario:jugadores[i].id})
      jugadores[i].cantidad = cantidad;
    }
    res.json(jugadores);
  },

  jugadoresByRoom: async function(req, res){
  	var jugadores = await Jugador.find({id_room:req.params.idRoom});
  	res.json(jugadores);
  },

  gameByRoom: async function(req, res){
  	var game = await Game.find({id:req.params.idRoom});
  	res.json(game);
  },

  chaptersByGame: async function(req, res){
  	var chapter = await Chapter.find({id_game:req.params.idGame});
  	res.json(chapter);
  },

  nivelesByChapter: async function(req, res){
  	var niveles = await Nivel.find({id_chapter:req.params.idChapter});
  	res.json(niveles);
  },

  leveluserBylevel: async function(req, res){
    var level = await Nivel_usuario.find({id_nivel:req.params.idLevel});
    res.json(level);
  },

  datosByJugador: async function(req, res){
  	var game = {};
  	var games = [];
  	
  	game = await Game.find();
  	console.log(game);
  	console.log(game.length)
  	for(var k=0; k<game.length; k++){
  		var countDatosNivel = 0;
  		console.log("entra")
  		var chapters = await Chapter.find({id_game:game[k].id});
	  	game[k].chapters = [];
	  	for(var j=0; j<chapters.length; j++){  		
	  		game[k].chapters.push(chapters[j]);
	  		var niveles = await Nivel.find({id_chapter:chapters[j].id})
	  		game[k].chapters[j].niveles = [];
	  		game[k].chapters[j].niveles.push(niveles);
	  		for(var i=0; i<niveles.length; i++){		
	  			var nivel_usuario = await Nivel_usuario.find({id_nivel:niveles[i].id, id_usuario:req.params.idJugador});
	  			if (nivel_usuario.length > 0){
	  				game[k].chapters[j].niveles[0][i].datos = [];
	  				game[k].chapters[j].niveles[0][i].datos.push(nivel_usuario);
	  				countDatosNivel++;
	  			}
	  		}
	  		var learning = await Learning.findOne({id_chapter:chapters[j].id});
	  		game[k].chapters[j].learning = [];
	  		game[k].chapters[j].learning.push(learning);
	  		//console.log(learning)
	  		var learn_jugador = await Learn_jugador.find({id_learning:learning.id,id_jugador:req.params.idJugador});
	  		//console.log("ahora el learn")
	  		//console.log(learn_jugador)
	  		game[k].chapters[j].learning[0].datos = [];
	  		game[k].chapters[j].learning[0].datos.push(learn_jugador);
	  	}
	  	if(countDatosNivel > 0){
	  		games.push(game[k]);	
	  	}
  	}
  	res.json(games);
  }

};

