/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

fs = require('fs');
sys = require('sys');
module.exports = {
    uploadAvatar: function(req, res) {
        req.file('avatar').upload({
            // don't allow the total upload size to exceed ~4MB
            maxBytes: 4000000,
            dirname: '../../assets/images/avatar/',
            saveAs: function(file, cb) {
                cb(null, req.body.userId + ".jpg");
            }
        }, function whenDone(err, uploadedFiles) {
            fs.createReadStream('assets/images/avatar/' + req.body.userId + ".jpg").pipe(fs.createWriteStream('.tmp/public/images/avatar/' + req.body.userId + ".jpg"));
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            /*User.update(req.body.userId, {
                    // Generate a unique URL where the avatar can be downloaded.
                    avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.body.userId),

                    // Grab the first file and use it's `fd` (file descriptor)
                    avatarFd: uploadedFiles[0].fd
                })
                .exec(function(err) {
                    if (err) return res.negotiate(err);
                    return res.ok();
                });*/
            return res.ok();
        });
    }
};
