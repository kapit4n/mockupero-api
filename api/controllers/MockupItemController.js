/**
 * MockupItemController
 *
 * @description :: Server-side logic for managing mockupitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

fs = require('fs');
sys = require('sys');
module.exports = {
    uploadAvatar: function(req, res) {
        var params = req.params.all();
        var img = params.img;
        var base64DataAssets = img.replace(/^data:image\/png;base64,/, "");
        var base64DataPublic = img.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile('assets/images/' + params.mockupId + ".png", base64DataAssets, 'base64', function(err) {
          if (err) {
            console.log(err);
          }
        });
        require("fs").writeFile('.tmp/public/images/' + params.mockupId + ".png", base64DataPublic, 'base64', function(err) {
          if (err) {
            console.log(err);
          }
        });
        return res.send('uploaded');
    }
};

