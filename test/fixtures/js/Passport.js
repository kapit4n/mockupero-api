var bcrypt = require('bcryptjs');
var _ = require('lodash');

var id = require('pow-mongodb-fixtures').createObjectId;
var users = require('./User');
var adminId = users[0]._id;

var passports = [
        {
            "protocol": "local",
            "password": "adminadminadmin",
            "user": adminId
        },
        {
            "protocol": "local",
            "password": "demodemodemo",
            "user": users[1]._id
        }
    ];

_.forEach(passports, function iterator(passport) {
    bcrypt.hash(passport.password, 10, function callback(error, hash) {
        passport.password = hash;
    });
});

exports.passport = passports;