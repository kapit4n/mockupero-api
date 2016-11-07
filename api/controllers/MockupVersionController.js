/**
 * MockupVersionController
 *
 * @description :: Server-side logic for managing mockupversions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
module.exports = {
    saveIt: function(req, res) {
        var versionRecord = req.params.all();
        if (req.isSocket && req.method === 'POST') {
            MockupVersion.create(versionRecord)
                .exec(function(error, created1) {
                    fs.createReadStream('assets/images/' + versionRecord.mockup + ".png").pipe(fs.createWriteStream('assets/images/version/' + created1.id + ".png"));
                    fs.createReadStream('assets/images/' + versionRecord.mockup + ".png").pipe(fs.createWriteStream('.tmp/public/images/version/' + created1.id + ".png"));
                    MockupVersion.publishCreate({
                        id: created1.id,
                        mockup: created1.mockup,
                        number: created1.number,
                        user: created1.user,
                        action: created1.action,
                        message: created1.message
                    });
                    return res.send('Created a version');
                });
        } else if (req.isSocket) {
            sails.sockets.join(req.socket, roomName);
            return res.send('User subscribed to creation');
        }
    }
};
