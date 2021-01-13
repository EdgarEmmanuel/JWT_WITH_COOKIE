const jwtoken = require("jsonwebtoken");

module.exports.helper=(req,res,next)=>{
    //get the token
    let token = req.cookies["token_user"];

        try {
         //verify the token
            const assertToken = jwtoken.verify(token,"devByJESUS");

            //if token we continue
            if(assertToken){
                next();
            }else{
                //else we redirect to the home page
                res.redirect("/");
            }
    } catch (error) {
        res.redirect("/");
    }

   
}