/**
* Workflow.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	 next: {
      collection: 'Workflow',
      via: 'previous',
      dominant: true
    },
    previous: {
      collection: 'Workflow',
      via: 'next'
    },

  }
};

