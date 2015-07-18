/**
* Mockup.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        // Primitive attributes
        name: {
            type: 'string',
            defaultsTo: 'Project Name'
        },
        state: {
            type: 'string',
            defaultsTo: 'New'
        },
        description: {
            type: 'string',
            defaultsTo: ''
        },
        project: {
            model: 'project'
        },
        feature: {
          model: 'feature'
        },
        members: {
          collection: 'Member',
          via: 'mockup'
        }
    }
};

