/**
 * SendEmailController
 *
 * @description :: Server-side logic for managing Sendemails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator({
    user: 'user@gmail.com',
    clientId: '437323264306kq8jn.apps.googleusercontent.com',
    clientSecret: 'qQVrPLpcyuiyFtRTR2iIZ7ScE',
    refreshToken: '1/aD2334234AClf1-i8hpK1Qb0UYl6qQqeNTcyUwg9XWI',
    accessToken: 'ya29.awIQ333333z9fiawk2x9KU8CqWa39jwXho3h' // optional
});

module.exports = {
    mail: function(req, res) {
        data_from_client = req.params.all();

        _to = data_from_client['to'];
        _subject = data_from_client['subject'];
        _text = data_from_client['text'];
        _from = 'mockupero@gmail.com'

        console.log(_to + ' ' + _subject + ' ' + _text);

        // listen for token updates
        // you probably want to store these to a db
        generator.on('token', function(token) {
            console.log('New token for %s: %s', token.user, token.accessToken);
        });

        // login
        var transporter = nodemailer.createTransport(({
            service: 'gmail',
            auth: {
                xoauth2: generator
            }
        }));

        // send mail
        transporter.sendMail({
            from: _from,
            to: _to,
            subject: _subject,
            text: _text
        }, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log('The notification was sent');
            }
        });
        return res.json({
            "success": 'true'
        });
    }
};