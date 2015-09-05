var bcrypt = require('bcryptjs');
var _ = require('lodash');
var id = require('pow-mongodb-fixtures').createObjectId;
var adminId = id();

exports.user = [
    {
        "_id": adminId,
        "username": "admin",
        "email": "admin@some.domain",
        "firstName": "Arnold",
        "lastName": "Administrator",
        "admin": true,
        "createdUser": adminId,
        "updatedUser": adminId
    },
    {
        "_id": id(),
        "username": "demo",
        "email": "demo@some.domain",
        "firstName": "John",
        "lastName": "Doe",
        "admin": false,
        "createdUser": adminId,
        "updatedUser": adminId
    }
];
   