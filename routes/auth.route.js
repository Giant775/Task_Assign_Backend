module.exports = function(app){
    var users = require("../controllers/auth.controller.js");
    
    //Route to fetch all users
    app.get('/api/auth/login', users.signIn);

    //Route to add a new user
    app.post('/addUser', users.addUser);

    //Route to delete a user
    app.delete('/deleteUser/:id', users.deleteUser);
    
}