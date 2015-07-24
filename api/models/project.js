/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
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
        type: {
            type: 'string',
            defaultsTo: 'Design'
        },
        description: {
            type: 'string',
            defaultsTo: 'Design is the creation of a plan or convention for the construction of an object or a system (as in architectural blueprints, engineering drawings, business ...'
        },
        mockups: {
            collection: 'mockup',
            via: 'project'
        },
        members: {
            collection: 'Member',
            via: 'project'
        },
        requirements: {
            collection: 'Requirement',
            via: 'project'
        }
    }
};
