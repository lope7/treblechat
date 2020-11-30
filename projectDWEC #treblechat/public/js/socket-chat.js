//File to set the logical structure of the communications.
var socket = io();

//Object params to get data from url (names and rooms)
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Insert your twitter account and the tendencie');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};


//Each time a user connects
socket.on('connect', function () {

    //To say to the server who the user is.
    socket.emit('getInTheChat', user, function (resp) {

        renderUsers(resp);
    });

});

// Listen to
socket.on('disconnect', function () {

    console.log('Connection missed');
});


// Listen to
socket.on('createMessage', function (message) {
    renderMessage(message, false);
    scrollBottom();
});
//Listen to user changes.
// When a user get in or leave the chat.
socket.on('userList', function (users) {
    renderUsers(users);
});
