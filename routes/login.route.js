module.exports = function(app){
    var login = require("../controllers/login.controller.js");
    //Route to login
    app.post('/login', login.signIn);
}