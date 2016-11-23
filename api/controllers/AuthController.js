var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        var socketId = '';
        if (req.isSocket) {
            socketId = sails.sockets.id(req.socket);
        }
        passport.authenticate('local', function(err, user, info) {
            console.log(user);
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.session.userId = user.id;
            req.logIn(user, function(err) {
                if (err) res.send(err);
                User.find().where({
                    email: user.email
                }).exec(function(err1, foundUser) {
                    if (foundUser.length == 0) {
                        return res.send('Not found user bb');
                    }
                    if (err1) {
                        console.error(err1);
                    } else {
                        LoginLog.find().where({
                            username: foundUser[0].username
                        }).exec(function(err2, foundLogin) {
                            if (err2) {
                                console.error(err2);
                            } else {
                                if (foundLogin.length == 0) {
                                    LoginLog.create({
                                        userId: foundUser[0].id,
                                        username: foundUser[0].username,
                                        online: true,
                                        socketId: socketId
                                    }).exec(function(err3, createdLog) {});
                                } else {
                                    LoginLog.update({
                                        id: foundLogin[0].id
                                    }, {
                                        online: true
                                    }).exec(function afterwards(err, updated) {
                                        if (err) {
                                            console.error(err);
                                        }
                                        LoginLog.publishUpdate(updated[0].id, { online: updated[0].online, username: updated[0].username });
                                        sails.sockets.broadcast('loginLog', { value: updated[0] });
                                    });
                                }
                            }
                        });
                    }
                });
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
