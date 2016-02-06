/**
 * LoginLogController
 *
 * @description :: Server-side logic for managing loginlogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    login: function(req, res) {
        username_val = req.param('username');
        user.find().where({
            username: username_val
        }).exec(function(err1, foundUser) {
            if (err1) {
                console.log('Error to query User');
                console.log(err1);
            } else {
                console.log('Success user query');
                console.log(foundUser.length);
                LoginLog.find().where({
                    username: username_val
                }).exec(function(err2, foundLogin) {
                    if (err2) {
                        console.log('Error to query loginLog');
                        console.log(err2);
                    } else {
                        console.log('Success LoginLog query');
                        console.log(foundLogin.length);
                        if (foundLogin.length == 0) {
                            LoginLog.create({
                                userId: foundUser[0].id,
                                username: foundUser[0].username,
                                online: true
                            }).exec(function(err3, createdLog) {
                                console.log(err3);
                                console.log(createdLog);
                                return res.send(createdLog[0]);
                            });
                        } else {
                            LoginLog.update({
                                id: foundLogin[0].id
                            }, {
                                online: true
                            }).exec(function afterwards(err, updated) {

                                if (err) {
                                    console.log('Error to put online the user');
                                    return res.send('failed');
                                }
                                console.log('The status of the loginLog is ' + updated[0].online);
                                LoginLog.publishUpdate(updated[0].id, {online: updated[0].online, username: updated[0].username});
                                //sails.sockets.broadcast('loginLog', { value: updated[0] });
                                return res.send(updated[0]);
                            });
                            console.log('The record has been updated');
                        }
                    }
                });
            }
        });
    },
    logout: function(req, res) {
        if(req.isSocket) {
            username_val = req.param('username');
            console.log(username_val);
            user.find().where({
                username: username_val
            }).exec(function(err1, foundLogin) {
                if (foundLogin.length > 0) {
                    LoginLog.update({
                        userId: foundLogin[0].id
                    }, {
                        online: false
                    }).exec(function afterwards(err, updated) {
                        if (err) {
                            console.log('Error to put logout the user');
                            return res.send('error');
                        }
                        console.log('The status of the loginLog is' + updated[0].online);
                        console.log(updated[0].id);
                        LoginLog.publishUpdate(updated[0].id, {online: false, username: updated[0].username});
                        //sails.sockets.broadcast('loginLog', { value: updated[0] });
                        return res.send(updated[0]);
                    });
                } else {
                    return res.send('');
                }
            });
        }
    },
    resetLogin: function(req, res) {
        LoginLog.find().exec(function(err, foundLogin) {
            if (err) {
                console.log('Error to reset login');
                return;
            } else {
                console.log('removing login logs');
                foundLogin.forEach(function(value) {
                    value.destroy();
                    return res.send('success');
                });
            }
        });
    }
};