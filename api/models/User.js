var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        username: {
            type: 'string'
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.error(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    },
    beforeUpdate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.error(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};
