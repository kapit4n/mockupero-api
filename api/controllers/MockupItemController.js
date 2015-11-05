/**
 * MockupItemController
 *
 * @description :: Server-side logic for managing mockupitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    uploadAvatar: function(req, res) {
    	console.log("upload avatar is called");
    	console.log();
    	console.log(req.body);
        req.file('file').upload({
		  dirname: require('path').resolve(sails.config.appPath, '/assets/images')
		},function (err, uploadedFiles) {
		  if (err) return res.negotiate(err);

		  return res.json({
		    message: uploadedFiles.length + ' file(s) uploaded successfully!'
		  });
		});
    }
};

