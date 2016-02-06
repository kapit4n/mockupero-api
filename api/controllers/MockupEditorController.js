/**
 * MockupEditorController
 *
 * @description :: Server-side logic for managing mockupeditors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getSocketId: function(req, res) {
        /*
        by the way the Socket Id changes
        qY4B-Q2g8G9vgh4mAAAB
        5eXGMnKB2U0G-F78AAAC
        */
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
        console.log(data_from_client);
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
            user.find().where({
                username: username_val
            }).exec(function(err1, foundUser) {
                if (err1) {
                    console.log('Error to query User');
                    console.log(err1);
                } else {
                    if (foundUser.length == 0) {
                        return res.send('There is not user with this username: ' + username_val);
                    }
                    console.log('Success user query');
                    console.log(foundUser.length);
                    MockupEditor.find().where({
                        username: username_val
                    }).exec(function(err2, foundLogin) {
                        if (err2) {
                            console.log('Error to query MockupEditor');
                            console.log(err2);
                        } else {
                            console.log('Success MockupEditor query');
                            console.log(foundLogin.length);
                            if (foundLogin.length == 0) {
                                MockupEditor.create({
                                    userId: foundUser[0].id,
                                    username: foundUser[0].username,
                                    online: true,
                                    socketId: socketId,
                                    roomName: roomName
                                }).exec(function(err3, createdLog) {
                                    console.log(err3);
                                    console.log(createdLog);
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
                                        console.log('Error to put online the user');
                                        return res.send('failed');
                                    }
                                    console.log('The status of the MockupEditor is ' + updated[0].online);
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
                                console.log('The record has been updated');
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
            console.log(username_val);
            user.find().where({
                username: username_val
            }).exec(function(err1, foundLogin) {
                if (err1) {
                    console.log('Error to query User');
                    console.log(err1);
                } else if (foundLogin.length > 0) {
                    MockupEditor.update({
                        userId: foundLogin[0].id
                    }, {
                        online: false
                    }).exec(function afterwards(err, updated) {
                        if (err) {
                            console.log('Error to put logout the user');
                            return res.send('error');
                        }
                        MockupEditor.publishUpdate(updated[0].id, {
                            offline: !updated[0].online,
                            username: updated[0].username
                        });
                        ////sails.sockets.broadcast('MockupEditor', { value: updated[0] });
                        return res.send(updated[0]);
                    });
                } else {
                    return res.send('');
                }
            });
        }
    }
};