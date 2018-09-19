module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'layouts/layout-dashboard',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {
    //window.location.href = '/';
    if(this.req.me.isSuperAdmin == true){
      var tipo = "admin";
    }
    return exits.success();

  }


};

