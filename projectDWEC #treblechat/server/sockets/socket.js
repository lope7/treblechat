const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utilities');

const users = new Users();

io.on('connection', (client) => {

    client.on('getInTheChat', (data, callback) => {

        //To validate the data from the login.
        if (!data.name || !data.room) {
            return callback({
                error: true,
                mensaje: 'Name account/tendencie is required'
            });
        }

        //To add users to the specific room.
        client.join(data.room);

        user.addUsers(client.id, data.name, data.room);
        //Say to users in the chat (only users in the specific chat) that another user joined the room.
        client.broadcast.to(data.room).emit('userList', users.getUserByRoom(data.room));
        client.broadcast.to(data.room).emit('createMessage', createMessage('User', `${data.name} joined`));

        callback(users.getUserByRoom(data.room));

    });

    client.on('createMessage', (data, callback) => {

        let user = users.getUsers(client.id);

        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('createMessage', message);

        callback(message);
    });


    client.on('disconnect', () => {

        let userDeleted = users.deleteUser(client.id);
        //To inform other users that userdeleted left the room
        client.broadcast.to(userDeleted.room).emit('createMessage', createMessage('User', `${userDeleted.name} left`));
        client.broadcast.to(userDeleted.room).emit('userList', users.getUserByRoom(userDeleted.room));


    });

});