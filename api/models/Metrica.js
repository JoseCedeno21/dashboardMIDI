/**
 * Metrica.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {
        type: 'string',
        required: true
    },
    proposito: {
        type: 'string'
    },
    formula: {
        type: 'string'
    },
    interpretacion: {
        type: 'string'
    },
    id_caracteristica: {
        model: 'caracteristica',
        required: true
    }
  },

};

