module.exports = {


  friendlyName: 'View charts page',


  description: 'Display the dashboard "charts" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/charts',
      description: 'Display the charts page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
