/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    count: function(req, res) {
        project.count({}).exec(function(err, num) {
            return res.json({
                "count": num
            });
        })
    }
};
