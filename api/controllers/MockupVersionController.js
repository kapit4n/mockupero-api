/**
 * MockupVersionController
 *
 * @description :: Server-side logic for managing mockupversions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveIt: function(req, res) {
        var versionRecord = req.params.all();
        if (req.isSocket && req.method === 'POST') {
            MockupVersion.create(versionRecord)
                .exec(function(error, created1) {
                    console.log(created1);
                    MockupVersion.publishCreate({
                        id: created1.id,
                        mockupId: created1.mockupId,
                        number: created1.number,
                        username: created1.username
                    });
                    return res.send('created a version');
                });
        } else if (req.isSocket) {
            sails.sockets.join(req.socket, roomName);
            return res.send('User subscribed to creation');
        }
    }
};

