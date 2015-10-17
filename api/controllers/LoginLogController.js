/**
 * LoginLogController
 *
 * @description :: Server-side logic for managing loginlogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    loginX: function(req, res) {
        username_val = req.param('username');
        result = '';
        user.find().where({
            username: username_val
        }).exec(function(err1, foundUser) {
            if (err1) {
                return res.send({
                    success: false
                });
            } else {
                LoginLog.find().where({
                    identifier: username_val
                }).exec(function(err, found) {
                    if (err) {
                        result = {
                            success: false
                        }
                        return res.send(result);
                    } else {
                        while (found.length) {
                            hello = found.pop();
                            result += hello.identifier;
                            hello.destroy();
                        }
                        result.success = true;
                        result.userId = foundUser.id;
                        return res.send(result);
                    }

                });
            }

        });
    },
    login: function(req, res) {
        username_val = req.param('username');
        user.find().where({
            username: username_val
        }).exec(function(err1, foundUser) {
            if(err1) {
                console.log('Error to query User');
                console.log(err1);
            } else {
                console.log('Success user query');
                console.log(foundUser.length);
                LoginLog.find().where({username: username_val}).exec(function(err2, foundLogin){
                    if (err2) {
                        console.log('Error to query loginLog');
                        console.log(err2);
                    } else {
                        console.log('Success LoginLog query');
                        console.log(foundLogin.length);
                        if(foundLogin.length == 0) {
                            LoginLog.create({userId: foundUser[0].id, username: foundUser[0].username, online: true}).exec(function(err3, createdLog){
                                console.log(err3);
                                console.log(createdLog);
                                console.log('created Login Log');
                                return res.send(createdLog[0]);
                            });
                        } else {
                            LoginLog.update({id: foundLogin[0].id},{online:true}).exec(function afterwards(err, updated){

                              if (err) {
                                console.log('Error to put online the user');
                                return res.send('failed');
                              }
                              console.log('The status of the loginLog is ' + updated[0].online);
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
        username_val = req.param('username');
        LoginLog.update({id: foundLogin[0].id}, {online: false}).exec(function afterwards(err, updated){
          if (err) {
            console.log('Error to put logout the user');
            return res.send('error');
          }
          console.log('The status of the loginLog is ' + updated[0].online);
          return res.send(updated[0]);
        });
    },
    resetLogin: function(req, res) {
        LoginLog.find().exec(function(err, foundLogin){
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