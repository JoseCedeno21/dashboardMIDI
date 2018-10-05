/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                              { action: 'view-homepage-or-redirect', locals:{layout:'layouts/layout-login'} },
  //'GET /welcome':            { action: 'dashboard/view-welcome', locals:{layout:'layouts/layout-dashboard'} },
  'GET /dashboard':                     { action: 'dashboard/view-welcome', locals:{layout:'layouts/layout-dashboard'} },
  'GET /datosGame/:id':                 { controller: 'dashboard/GetInformacionController', action:'datos' },
  'GET /datosGameEscuela/:id/:room/:escuela':                 { controller: 'dashboard/GetInformacionController', action:'datosEscuela' },
  'GET /cantidades':                    { controller: 'dashboard/GetInformacionController', action:'cantidades' },
  'GET /games':                         { controller: 'dashboard/GetInformacionController', action:'games' },
  'GET /niveles':                       { controller: 'dashboard/GetInformacionController', action:'niveles' },
  'GET /escuelas':                      { controller: 'dashboard/GetInformacionController', action:'escuelas' },
  'GET /escenarios':                    { controller: 'dashboard/GetInformacionController', action:'escenarios' },
  'GET /escenario/:idEscenario':        { controller: 'dashboard/GetInformacionController', action:'escenarioById' },
  'GET /nivel/:id':                     { controller: 'dashboard/GetInformacionController', action:'nivel' },
  'GET /escenariosByLevel/:idlevel':    { controller: 'dashboard/GetInformacionController', action:'escenariosByLevel' },
  'GET /leveluser/:idLevel':            { controller: 'dashboard/GetInformacionController', action:'leveluserBylevel' },
  'GET /learnuser/:idLevel':            { controller: 'dashboard/GetInformacionController', action:'learnuserBylevel' },
  'GET /rooms':                         { controller: 'dashboard/GetInformacionController', action:'rooms' },
  'GET /jugadores':                     { controller: 'dashboard/GetInformacionController', action:'jugadores' },
  'GET /jugadoresByRoom/:idRoom':       { controller: 'dashboard/GetInformacionController', action:'jugadoresByRoom' },
  'GET /jugadoresByRoomEscuela/:idGame/:idRoom/:idEscuela':       { controller: 'dashboard/GetInformacionController', action:'jugadoresByRoomEscuela' },
  'GET /gameByRoom/:idRoom':            { controller: 'dashboard/GetInformacionController', action:'gameByRoom' },
  'GET /chaptersByGame/:idGame':        { controller: 'dashboard/GetInformacionController', action:'chaptersByGame' },
  'GET /nivelesByChapter/:idChapter':   { controller: 'dashboard/GetInformacionController', action:'NivelesByChapter' },
  'GET /datosByJugador/:idJugador':     { controller: 'dashboard/GetInformacionController', action:'datosByJugador' },
  'GET /metrics':                       { controller: 'dashboard/GetInformacionController', action:'metrics' },
  'GET /getLevelUser':                  { controller: 'dashboard/GetInformacionController', action:'levelusers' },
  'GET /usersByRoom/:idRoom':           { controller: 'dashboard/GetInformacionController', action:'usersByRoom' },
  'GET /levelAnduser/:idLevelidUser':   { controller: 'dashboard/GetInformacionController', action:'leveluserByLevelUser' },
  'GET /levelsByRoom/:idRoom':          { controller: 'dashboard/GetInformacionController', action:'levelsByRoom' },
  'GET /levelUserByEscenario/:idEscenario':       { controller: 'dashboard/GetInformacionController', action:'levelUserByEscenario' },
  'GET /levelsByGame/:idGame':          { controller: 'dashboard/GetInformacionController', action:'levelsByGame' },
  'GET /room/:id':                      { controller: 'dashboard/GetInformacionController', action:'roomById' },
  'GET /roomByEscuela/:idEscuela':      { controller: 'dashboard/GetInformacionController', action:'roomByEscuela' },
  'GET /escuelaRoom':                   { controller: 'dashboard/GetInformacionController', action:'escuelaRoom' },
  'GET /juegosByEscenario/:idEscenario':{ controller: 'dashboard/GetInformacionController', action:'juegosByEscenario' },
  'GET /jugadoresByEscenario/:idEscenario':{ controller: 'dashboard/GetInformacionController', action:'jugadoresByEscenario' },
  'GET /jugadoresExceptAnEscenario/:idEscenario':{ controller: 'dashboard/GetInformacionController', action:'jugadoresExceptAnEscenario' },


  //'GET /forms':            { action: 'dashboard/view-forms' },
  //'GET /charts':            { view: 'pages/dashboard/charts' },

  'GET /contact':            { view:   'pages/contact', locals:{layout:'layouts/layout-login'} },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login', locals:{layout:'layouts/layout-login'} },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password', locals:{layout:'layouts/layout-login'} },
  'GET /password/new':       { action: 'entrance/view-new-password', locals:{layout:'layouts/layout-login'} },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
  'POST  /api/v1/entrance/AlmacenarDatosController' : { controller: 'entrance/AlmacenarDatosController', action:'guardar', csrf: false},


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

};
