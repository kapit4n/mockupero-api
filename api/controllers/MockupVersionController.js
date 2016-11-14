/**
 * MockupVersionController
 *
 * @description :: Server-side logic for managing mockupversions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
module.exports = {
    mockupVersionRestore: function(req, res) {
        var versionRecord = req.params.all();
        MockupVersion.find().where({ id: versionRecord.mockupVersionId }).exec(function(err, mockupVersions) {
            var mockupVersion = mockupVersions[0];
            var mockupVersionNew = {
                number: mockupVersion.number,
                mockup: mockupVersion.mockup,
                user: mockupVersion.user,
                action: mockupVersion.action,
                message: 'Restored the Mockup'
            };
            delete mockupVersionNew.id;
            MockupVersion.create(mockupVersionNew).exec(function(errCreateVersion2, mockupVersionCreated) {
                fs.createReadStream('assets/images/version/' + mockupVersion.id + ".png").pipe(fs.createWriteStream('assets/images/version/' + mockupVersionCreated.id + ".png"));
                fs.createReadStream('assets/images/version/' + mockupVersion.id + ".png").pipe(fs.createWriteStream('.tmp/public/images/version/' + mockupVersionCreated.id + ".png"));

                fs.createReadStream('assets/images/version/' + mockupVersion.id + ".png").pipe(fs.createWriteStream('assets/images/' + mockupVersionCreated.mockup.id + ".png"));
                fs.createReadStream('assets/images/version/' + mockupVersion.id + ".png").pipe(fs.createWriteStream('.tmp/public/images/' + mockupVersionCreated.mockup.id + ".png"));

                mockupItem.destroy({ mockup: mockupVersion.mockup.id }).exec(function(delErr, dalated1) {
                    if (delErr) {
                        return res.negotiate(delErr);
                    }
                    MockupItemVersion.find().where({ mockupVersion: versionRecord.mockupVersionId }).exec(function(err, itemVersionList) {
                        itemVersionList.forEach(function(item) {
                            delete item.id;
                            delete item.mockupVersion;
                            mockupItem.create(item).exec(function(createErr, createdItem) {
                            });
                            item.mockupVersion = mockupVersionCreated;
                            MockupItemVersion.create(item).exec(function(itemVCreateErr, createItemVersion) {
                            });
                        });
                    });
                });

            });

        });
        return res.send('Created a version');

    },
    saveIt: function(req, res) {
        var versionRecord = req.params.all();
        if (req.isSocket && req.method === 'POST') {
            MockupVersion.create(versionRecord)
                .exec(function(error, created1) {
                    fs.createReadStream('assets/images/' + versionRecord.mockup + ".png").pipe(fs.createWriteStream('assets/images/version/' + created1.id + ".png"));
                    fs.createReadStream('assets/images/' + versionRecord.mockup + ".png").pipe(fs.createWriteStream('.tmp/public/images/version/' + created1.id + ".png"));

                    mockupItem.find().where({ mockupId: created1.mockup }).exec(function(err, data) {
                        if (Array.isArray(data)) {
                            data.forEach(function(data1) {
                                delete data1.id;
                                data1.mockupVersion = created1;
                                MockupItemVersion.create(data1).exec(function(err2, created2) {
                                    if (err2) {
                                        console.error(err2);
                                    }
                                });
                            });
                        }
                    });

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
    },
    deleteMockupVersion: function(req, res) {
        var versionRecord = req.params.all();
        var ss = versionRecord.mockupVersionId;
        MockupItemVersion.destroy({ mkockupVersion: versionRecord.mockupVersionId }).exec(function(delErr1, deleted1) {
            MockupVersion.destroy({ id: versionRecord.mockupVersionId }).exec(function(delErr2, deleted2) {
                return res.send('Removed mockup version');
            });
        });

    }
};
