module.exports = function(app){
    var users = require("../controllers/users.controller.js");
    
    //Route to fetch all users
    app.get('/users/', users.users);

    //Route to add a new user
    app.post('/addUser', users.addUser);

    //Route to delete a user
    app.delete('/deleteUser/:id', users.deleteUser);
    
}