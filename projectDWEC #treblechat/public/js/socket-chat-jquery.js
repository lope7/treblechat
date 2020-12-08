//To get data from the url.
var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');


// JQuery References that allow me to replace DOM elements.
var usersDiv = $('#usersDiv');
var sendForm = $('#sendForm');
var messageTxt = $('#messageTxt');
var divChatbox = $('#divChatbox');

// Functions to render users
function renderUsers(users) {

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> #' + params.get('room') + '</a>';
    html += '</li>';
    html += '<div class= text-center mt-5>';
    html += '    <div class = mt-3><h6> Users </h6></div>';
    html += '</div>';

    for (var i = 0; i < users.length; i++) {

        html += '<li>';
        html += '    <a data-id="' + users[i].id + '"  href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> @' + users[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    usersDiv.html(html);

}


function renderMessage(message, me) {

    var html = '';
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';
    if (message.name === 'Administrador') {
        adminClass = 'danger';
    }

    if (me) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>Me:</h5>';
        html += '        <div class="box bg-light-inverse">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (message.name !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + message.name + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';

    }

    divChatbox.append(html);

}

//To make scroll the messages div.
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners

sendForm.on('submit', function (e) {

    //Allow send messages in the chat
    e.preventDefault();
    //If you don´t a send a message, do nothing.
    if (messageTxt.val().trim().length === 0) {
        return;
    }

    socket.emit('createMessage', {
        name: name,
        message: messageTxt.val()
    }, function (message) {
        messageTxt.val('').focus();
        renderMessage(message, true);
        scrollBottom();
    });

});
