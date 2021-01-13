var auth_controler = require("../controllers/authController");

const helper = require("../middleware/middleware").helper;

module.exports=(app,mongo,json,urlencoded)=>{

    app.get("/",auth_controler.signup_get);
    
    app.get("/signup",auth_controler.signup_get);

    app.get("/home",helper,auth_controler.home_page);

    app.post("/signUp",urlencoded,auth_controler.signup_post);
    
    app.get("/login",auth_controler.login_get);
    
    app.post("/LogIn",urlencoded,auth_controler.login_post);

    app.get("/logout",auth_controler.logout_action);

}