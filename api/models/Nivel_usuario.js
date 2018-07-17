/**
 * Nivel_usuario.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id_usuario: {
        type: 'number',
        required: true
    },
    id_nivel: {
        type: 'number',
        required: true
    },
    nombre: {
        type: 'string',
    },
    descripcion: {
        type: 'string'
    },
    fecha_inicio: {
        type: 'ref',
        columnType: 'date'
    },
    fecha_fin: {
        type: 'ref',
        columnType: 'date'
    },
    tiempo_juego: {
        type: 'number'
    },
    estado: {
        type: 'string',
        required: true
    },
    correctas: {
        type: 'number'
    },
    incorrectas: {
        type: 'number'
    },
    intentos: {
        type: 'number'
    }

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

