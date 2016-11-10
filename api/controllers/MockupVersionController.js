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
        var ss = versionRecord.mockupVersionId;
        MockupVersion.find().where({ id: versionRecord.mockupVersionId }).exec(function(err, mockupVersion) {
            mockupItem.destroy({ mockup: mockupVersion.mockup }).exec(function(delErr) {
                if (delErr) {
                    return res.negotiate(delErr);
                }
                MockupItemVersion.find().where({ mockupVersion: versionRecord.mockupVersionId }).exec(function(err, itemVersionList) {
                    itemVersionList.forEach(function(item) {
                        delete item.id;
                        delete item.mockupVersion;
                        mockupItem.create(item).exec(function(createErr, createdItem) {
                            console.log("Created Item restored successfull");
                        });
                        item.mockupVersion = mockupVersion;
                        MockupItemVersion.create(item).exec(function(itemVCreateErr, createItemVersion) {
                            console.log("Item version was created");
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
                                    } else {
                                        console.log('Created Mockup Item Version Successfull');
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
    saveMockupVersion() {

    }
};
