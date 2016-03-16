/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    count: function(req, res) {
        var params = req.params.all();
        project.count({
            name: {
                'contains': params.name
            }
        }).exec(function(err, num) {
            return res.json({
                "count": num
            });
        })
    },
    projectPermission: function(req, res) {
        var params = req.params.all();
        if (params.projectId && params.userId) {
            projectShare.find().where(
                {
                    project: params.projectId,
                    user: params.userId
                }).exec(function(err, foundPermission) {
                    if (foundPermission) {
                        Permission.find().where({id: foundPermission[0].permission}).exec(function(err, foundPer) {
                            return res.json({
                                "permission": foundPer
                            });
                        });
                    }
                });
        } else {
             return res.json({
                "permission": 0
            });
        }
    }
};
