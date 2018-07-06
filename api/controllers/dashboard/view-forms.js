module.exports = {


  friendlyName: 'View forms page',


  description: 'Display the dashboard "forms" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/forms',
      description: 'Display the formss page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
