/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    count: function(req, res) {
        var params = req.params.all();
        project.find().where(JSON.parse(params.where)).exec(function(err, countProjects) {
            if (err) {
                return res.json({ "err": err });
            }
            return res.json({ "count": countProjects.length })
        });
    },
    projectPermission: function(req, res) {
        var params = req.params.all();
        if (params.projectId && params.userId) {
            project.find().where({
                id: params.projectId,
                userId: params.userId
            }).exec(function(err, foundProject) {
                if (foundProject && foundProject.length) {
                    var ownerPermission = [];
                    ownerPermission.push({ can: 'edit' });
                    return res.json({
                        "permission": ownerPermission
                    });
                } else {
                    projectShare.find().where({
                        project: params.projectId,
                        user: params.userId
                    }).exec(function(err, sharePermission) {
                        if (err) {
                            console.log(err);
                        }
                        if (sharePermission && sharePermission.length) {
                            Permission.find().where({ id: sharePermission[0].permission }).exec(function(err, foundPer) {
                                return res.json({
                                    "permission": foundPer
                                });
                            });
                        }
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
