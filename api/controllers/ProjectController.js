/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res) {
        var params = req.params.all()
        Project.create({
            name: 'project name'
        }).exec(function createCB(err, created) {
            return res.json({
                notice: 'Created user with name ' + created.name
            });
        });

    },

    getAll: function(req, res) {
        Project.find({
            name: {
                'contains': 'name'
            }
        }).exec(function(err, val) {
            res.send(val);
        });
    }

};
