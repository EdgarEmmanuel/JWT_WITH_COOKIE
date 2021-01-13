let user_model = require("../models/User").user;
const jwtoken = require("jsonwebtoken");

//set the max age : 3days * 24hours * 60mn * 60sec
const maxAge = 3 * 24 * 60 * 60;


//create the token 
const createToken = (id) => {
        return jwtoken.sign({ id },"devByJESUS",{
            expiresIn:maxAge
        });
}


//handle all the error
const errorHandler = (err) => {

    //console.log(err.message,err.code);
    let error = {email:"",password:""};

    if(err.message.contains("users validation failed")){
        object.values(err.errors).forEach(({properties})=>{
            error[properties.path]= properties.message;
        });
    }
}

module.exports={
    
    signup_get(req,res){
        res.render("sign_up",{error:""});
    },

    signup_post(req,res){
        try{
            //insert the user in the database
            user_model({
                email:req.body.email,
                password:req.body.password
            }).save().then((data)=>{

                //set the token
                const token = createToken(data._id);

                //set the cookie and some params
                res.cookie("token_user",token,{httpOnly:true,maxAge:maxAge});

                //redirect to the home page
                res.redirect("/home");

                //res.status(201).json({user:data._id});
            });

        }catch(err){
            // var error = errorHandler(err);
            return res.status(201).json({error});
        }
    },

    home_page(req,res){
        res.render("home");
    },

    login_get(req,res){
        res.render("login");
    },

    login_post(req,res){
        const email = req.body.email;
        const password = req.body.password;
        try {
            //fetch from the database
            user_model.find({email:email,password:password})
            .then((data)=>{
                if(data.length===0){
                    res.redirect("/");
                }else{
                    //create the token
                    const token = createToken(data._id);

                    //set the cookie
                    res.cookie("token_user",token,{httpOnly:true,maxAge:maxAge});

                    //redirect to the home page
                    res.redirect("/home");
                }
            }).catch(err=>{
                res.redirect("/");
            })
        } catch (error) {
         res.redirect("/");
        }
    },

    logout_action(req,res){
        //erase the token
        res.cookie("token_user","");

        //redirect
        res.redirect("/");
    }

}