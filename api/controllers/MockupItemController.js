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
                console.error(err);
            }
        });
        require("fs").writeFile('.tmp/public/images/' + params.mockupId + ".png", base64DataPublic, 'base64', function(err) {
            if (err) {
                console.error(err);
            }
        });
        return res.send('uploaded');
    },
    saveAll: function(req, res) {
        var params = req.params.all();
        var items = params.items;
        items.forEach(function(item) {
            var callback = function(err, updated) {};
            if (item.id) {
                mockupItem.update({ id: item.id }, item).exec(callback);
            } else {
                mockupItem.create(item).exec(callback);
            }
        });
        return res.send('All Saved');
    }
};
