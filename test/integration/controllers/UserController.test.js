var request = require('supertest');

describe('UserController', function() {

    describe('user', function() {
        it('should get some result', function(done) {
            request(sails.hooks.http.app)
                .get('/user')
                .expect(200, done);
        });
    });

});
