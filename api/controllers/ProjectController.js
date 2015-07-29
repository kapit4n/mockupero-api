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
    }
};
