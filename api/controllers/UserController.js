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
        var params = req.params.all();
        console.log(req.body);
        req.file('avatar').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000,
            dirname: '../../assets/images/avatar/',
            saveAs: function(file, cb) {
                cb(null, req.body.userId + ".png");
            }
        }, function whenDone(err, uploadedFiles) {
            console.log("ERROR 0");
            if (err) {
                console.log("ERROR 1");
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                console.log("ERROR 3");
                return res.badRequest('No file was uploaded');
            }

            console.log("ERROR 4");
            // Save the "fd" and the url where the avatar for a user can be accessed
            console.log("Session ID: " + params);
            console.log(params);
            console.log(req.body.userId);
            console.log("URL: " + sails.getBaseUrl());
            console.log(uploadedFiles[0].fd);
            return res.ok();
            /*User.update(req.param('userId'), {
                    // Generate a unique URL where the avatar can be downloaded.
                    avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.param('userId')),

                    // Grab the first file and use it's `fd` (file descriptor)
                    avatarFd: uploadedFiles[0].fd
                })
                .exec(function(err) {
                    console.log("ERROR 5");
                    console.log(err);
                    if (err) return res.negotiate(err);
                    return res.ok();
                });*/
        });
    },

    avatar: function(req, res) {
        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!user.avatarFd) {
                return res.notFound();
            }

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk( /* optional opts */ );

            // set the filename to the same file as the user uploaded
            res.set("Content-disposition", "attachment; filename='" + file.name + "'");

            // Stream the file down
            fileAdapter.read(user.avatarFd)
                .on('error', function(err) {
                    return res.serverError(err);
                })
                .pipe(res);
        });
    }
};
