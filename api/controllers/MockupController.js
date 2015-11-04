/**
 * MockupController
 *
 * @description :: Server-side logic for managing mockups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getRoomsList: function(req, res) {
	    var roomNames = JSON.stringify(sails.sockets.rooms());
	    res.json({
	      message: 'A list of all the rooms: '+roomNames
	    });
	}
};

