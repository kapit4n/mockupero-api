/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    addConv: function(req, res) {
        var data_from_client;
        var email;
        data_from_client = req.params.all();
        if (data_from_client && data_from_client['email']) {
            email = data_from_client['email'];
        }

        if (req.isSocket && req.method === 'POST') {

            // This is the message from connected client
            // So add new conversation
            Chat.create(data_from_client)
                .exec(function(error, data_from_client) {
                    Chat.publishCreate({
                        id: data_from_client.userId,
                        userId: data_from_client.userId,
                        message: data_from_client.message,
                        user: data_from_client.user
                    });
                    return res.send('created');
                });
        } else if (req.isSocket) {
            // subscribe client to model changes 
            Chat.watch(req.socket);
            sails.sockets.join(req.socket, email);
            var allRooms = JSON.stringify(sails.sockets.rooms());
            var socketRooms = JSON.stringify(sails.sockets.socketRooms(req.socket));
            var subscribers = sails.sockets.subscribers(email);
            return res.send('User subscribed to');
        }
    }
};
