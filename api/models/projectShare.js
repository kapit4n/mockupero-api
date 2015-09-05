/**
 * Project_share.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        // Primitive attributes
        project: {
            model: 'project'
        },
        user: {
            model: 'user'
        },
        permission: {
            model: 'permission'
        }

    }
};
