//I create this file because I will use createMessage a lo of
//times with the following details.
const createMessage = (name, message) => {

    return {
        name,
        message,
        date: new Date().getTime()
    };
}

module.exports = {
    createMessage
}
