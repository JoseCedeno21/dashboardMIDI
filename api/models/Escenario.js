/**
 * Type_room.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        codigo: {
            type: 'string'
        },
        descripcion: {
            type: 'string'
        },
        nombre: {
            type: 'string'
        },

        // Add a reference to Rooms
        rooms: {
            collection: 'room',
            via: 'id_escenario' //puede ser cualquier nombre, mientras sea el mismo del objeto
        }
    }

};

