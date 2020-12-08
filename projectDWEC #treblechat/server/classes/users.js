class Users {

    constructor() {

        this.users = [];
    }
    
    /**
     * Method to add users to the chat
     * @param {*} id 
     * @param {*} name 
     * @param {*} room 
     */
    addUsers(id, name, room) {

        let user = { id, name, room };

        //Add user to the array
        this.users.push(user);

        return this.users;

    }
    /**
     * Method to get user by the id.
     * @param {*} id 
     */
    getUserById(id) {
        //Filter return a new array but I need the first position,[0]
        let user = this.users.filter(user => user.id === id)[0];
        //If it find the user return the user if not return false.
        return user;
    }


   /**
    * Method to get all the users in the chat.
    */
    getUsers() {
        return this.users;
    }
    
    /**
     * Method to get users by room.
     * @param {*} sala 
     */
    getUserByRoom(room) {
        let usersInTheRoom = this.users.filter(user => user.room === room);
        return usersInTheRoom;
    }

   /**
    * Method to delete a user from the array, return the array without that person.
    * @param {} id 
    */

    deleteUser(id) {
        //To get the user who leave the chat.
        let userDeleted = this.getUserById(id);

        this.users = this.users.filter(user => user.id != id);

        return userDeleted;

    }


}
//Export the class to use it in other files.
module.exports = {
    Users
}
