/**
 * LoginLogController
 *
 * @description :: Server-side logic for managing loginlogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		username_val = req.param('username');
		result = 'TT ';
		LoginLog.find().where({identifier: username_val}).exec(function(err, found){
			while (found.length) {
				hello = found.pop();
				result += hello.identifier;
				hello.destroy();
			}
			console.log("You are login" + result);
			return res.send("You are login" + result);
		});
		
	}
};

