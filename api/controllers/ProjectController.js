/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res) {
        var params = req.params.all()
        project.create({
            name: params.name,
            description: params.description
        }).exec(function createCB(err, created) {
            return res.json({
                notice: 'Created user with name ' + created.name
            });
        });
    },

    getAll: function(req, res) {
        project.find().exec(function(err, val) {
            res.send(val);
        });
    },

    getAllThatContains: function(req, res) {
        var params = req.params.all()
        project.find({
            name: {
                'contains': params.contains
            }
        }).exec(function(err, val) {
            res.send(val);
        });
    }

};
