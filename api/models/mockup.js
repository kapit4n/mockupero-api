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
        imgToShow: {
            type: 'string',
            defaultsTo: 'http://blogs.atlassian.com/news/2009/09/10/SimpleLoginScreen-thumb-250x179.png'
        },
        project: {
            model: 'project'
        },
        owner: {
            model: 'user'
        },
        feature: {
          model: 'feature'
        }
    }
};

