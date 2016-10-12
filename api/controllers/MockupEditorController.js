/**
 * MockupEditorController
 *
 * @description :: Server-side logic for managing mockupeditors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getSocketId: function(req, res) {
        return res.send(sails.sockets.id(req.socket));
    },

    getEditors: function(req, res) {
        var data_from_client;
        var roomName;
        data_from_client = req.params.all();
        if (data_from_client && data_from_client['roomName']) {
            roomName = data_from_client['roomName'];
        } else {
            roomName = 'General_Mockup_Room';
        }
        var subscribers = sails.sockets.subscribers(roomName);
        // get all mockupEditor that have that socket id from that roomName and return them
        // remember that when we reload the socket id will be removed
        return res.send(subscribers);
    },

    editors: function(req, res) {
        var data_from_client;
        var roomName;
        data_from_client = req.params.all();
        var socketId = sails.sockets.id(req.socket);

        if (data_from_client && data_from_client['roomName']) {
            roomName = data_from_client['roomName'];
        } else {
            roomName = 'General_Mockup_Room';
        }

        if (!req.isSocket) {
            return res.send('is not socket');
        }

        if (req.isSocket && req.method === 'POST') {
            username_val = req.param('username');
            User.find().where({
                username: username_val
            }).exec(function(err1, foundUser) {
                if (err1) {
                    console.error(err1);
                } else {
                    if (foundUser.length == 0) {
                        return res.send('There is not user with this username: ' + username_val);
                    }
                    MockupEditor.find().where({
                        username: username_val
                    }).exec(function(err2, foundLogin) {
                        if (err2) {
                            console.error(err2);
                        } else {
                            if (foundLogin.length == 0) {
                                MockupEditor.create({
                                    userId: foundUser[0].id,
                                    username: foundUser[0].username,
                                    online: true,
                                    socketId: socketId,
                                    roomName: roomName
                                }).exec(function(err3, createdLog) {
                                    if (err3) {
                                        console.error(err3);
                                    } else {
                                        MockupEditor.publishCreate(_.omit(createdLog, 'online'), req);
                                        SocketManager.create({ socketId: socketId, objectName: 'MockupEditor' }).exec(
                                            function(err_sm, created_sm) {
                                                if (err_sm) {
                                                    console.error(err_sm);

                                                }
                                            });
                                    }
                                    return res.send(createdLog[0]);
                                });
                            } else {
                                MockupEditor.update({
                                    id: foundLogin[0].id
                                }, {
                                    online: true,
                                    socketId: socketId,
                                    roomName: roomName
                                }).exec(function afterwards(err, updated) {

                                    if (err) {
                                        console.error(err);
                                        return res.send('failed');
                                    }
                                    // this source code is duplicated, remove the socketManager created maybe notify that the 
                                    SocketManager.create({ socketId: socketId, objectName: 'MockupEditor' }).exec(
                                        function(err_sm, created_sm) {
                                            if (err_sm) {
                                                console.log('Error to SocketManager creating');
                                            }
                                        });
                                    MockupEditor.publishUpdate(updated[0].id, {
                                        online: updated[0].online,
                                        username: updated[0].username,
                                        socketId: socketId
                                    });
                                    sails.sockets.broadcast('MockupEditor', {
                                        value: updated[0]
                                    });
                                    return res.send(updated[0]);
                                });
                            }
                        }
                    });
                }
            });
        } else {
            MockupEditor.watch(req.socket);
            sails.sockets.join(req.socket, roomName);
            return res.send('User subscribed to ' + roomName);
        }
    },
    logout: function(req, res) {
        if (req.isSocket) {
            username_val = req.param('username');
            User.find().where({
                username: username_val
            }).exec(function(err1, foundLogin) {
                if (err1) {
                    console.error(err1);
                    return res.send('Logout failed');
                } else if (foundLogin.length > 0) {
                    MockupEditor.update({
                        userId: foundLogin[0].id
                    }, {
                        online: false
                    }).exec(function afterwards(err, updated) {
                        if (err) {
                            return res.send('error');
                        }
                        MockupEditor.publishUpdate(updated[0].id, {
                            offline: !updated[0].online,
                            username: updated[0].username
                        });
                        return res.send(updated[0]);
                    });
                } else {
                    return res.send('User Not found to logout');
                }
            });
        }
    }
};
