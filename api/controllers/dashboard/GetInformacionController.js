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

  roomsByLevel: async function(req, res){
    var nivel = await Nivel.findOne({id:req.params.idlevel});
    var chapter = await Chapter.findOne({id:nivel.id_chapter});
    var game = await Game.findOne({id:chapter.id_game});
    var rooms = await Room.find({id_juego:game.id});

    res.json(rooms);
  },

  roomById: async function(req, res){
    var room = await Room.findOne({id:req.params.id});
    res.json(room);
  },

  leveluserBylevel: async function(req, res){
    var level = await Nivel_usuario.find({id_nivel:req.params.idLevel});
    res.json(level);
  },

  learnuserBylevel: async function(req, res){
    var level = {};
    var countDatosNivel = 0;
    
    level = await Nivel.find({id:req.params.idLevel});
    var learn_user = await Learn_jugador.find({id_learning:level[0].id_learning});

    console.log(learn_user);
    console.log(learn_user.length)
    res.json(learn_user);
  
  },

  metrics: async function(req, res){
    var metrica_tmp = await Metrica.find();
    var caracteristica;
    var metrica = [];
    for(var i=0; i<metrica_tmp.length; i++){
      caracteristica = await Caracteristica.findOne({id:metrica_tmp[i].id_metrica});
      metrica.push({
        id: metrica_tmp[i].id,
        nombre: metrica_tmp[i].nombre,
        proposito: metrica_tmp[i].proposito,
        formula: metrica_tmp[i].formula,
        interpretacion: metrica_tmp[i].interpretacion,
        nombre_car: caracteristica.nombre,
        descripcion_car: caracteristica.descripcion
        });
      }
    res.json(metrica);
  
  },

  datosByJugador: async function(req, res){
  	var game = {};
  	var games = [];
  	
  	game = await Game.find();
  	console.log(game);
  	console.log(game.length)
  	for(var k=0; k<game.length; k++){
  		var countDatosNivel = 0;
  		var chapters = await Chapter.find({id_game:game[k].id});
	  	game[k].chapters = [];
	  	for(var j=0; j<chapters.length; j++){  		
	  		game[k].chapters.push(chapters[j]);
	  		var niveles = await Nivel.find({id_chapter:chapters[j].id});
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
	  		console.log("learning: " + learning);
	  		var learn_jugador = await Learn_jugador.find({id_learning:learning.id,id_jugador:req.params.idJugador});
	  		console.log("learn_jugador: " + learn_jugador);
	  		game[k].chapters[j].learning[0].datos = [];
	  		game[k].chapters[j].learning[0].datos.push(learn_jugador);
	  	}
	  	if(countDatosNivel > 0){
	  		games.push(game[k]);	
	  	}
  	}
  	res.json(games);
  },

  usersByRoom: async function(req, res){
    var jugadores = await Jugador.find({id_room:req.params.idRoom});

    res.json(jugadores);
  },

  leveluserByLevelUser: async function(req, res){
    var cadenaADividir = req.params.idLevelidUser;
    var arrayDeCadena = cadenaADividir.split("-");

    var idLevel = arrayDeCadena[0];
    var idUser = arrayDeCadena[1];

    var level_user = await Nivel_usuario.find({id_usuario:idUser, id_nivel:idLevel});

    res.json(level_user);
  },

  levelusers: async function(req, res){
    var level_user = await Nivel_usuario.find();
    res.json(level_user);
  },

  levelsByRoom: async function(req, res){
    var level_room = [], level_room_tmp = [];
    var level_users = [];
    var nivel = null;

    var jugadores = await Jugador.find({id_room:req.params.idRoom});


    for(var i = 0; i < jugadores.length; i++){
      level_users = await Nivel_usuario.find({id_usuario:jugadores[i].id});
      for(var j = 0; j < level_users.length; j++){
        nivel = await Nivel.findOne({id:level_users[j].id_nivel});
        console.log(nivel);
        if (!nivel != null) {
          level_room_tmp = level_room.filter(function(level_tmp) {
            return level_tmp.id === nivel.id;
          });
          
        }

        if (level_room_tmp.length == 0) level_room.push(nivel);

        nivel = null;
        level_room_tmp = [];
      }
    }

    

    res.json(level_room);
  },

  levelsByGame: async function(req, res){
    var chapters = await Chapter.find({id_game:req.params.idGame});
    var levels_tmp, levels = [];

    for(var i = 0; i < chapters.length; i++){
      levels_tmp = await Nivel.find({id_chapter:chapters[i].id});
      for(var j = 0; j < levels_tmp.length; j++){
        if (chapters[i].id == levels_tmp[j].id_chapter) {
          levels.push(levels_tmp[j]);
        }
      }
    }
    

    res.json(levels);
  },

  leveluserByRoom: async function(req, res){
    var jugadores = await Jugador.find({id_room:req.params.idRoom});
    var level_user_tmp = await Nivel_usuario.find();
    var level_user = [];

    for(var i = 0; i < level_user_tmp.length; i++){
      for(var j = 0; j < jugadores.length; j++){
        if (level_user_tmp[i].id_usuario == jugadores[j].id) {
          level_user.push(level_user_tmp[i]);
        }
      }
    }
    
    res.json(level_user);
  },

};

