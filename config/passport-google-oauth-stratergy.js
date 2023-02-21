const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy ;
const User = require("../models/user");
const crypto = require('crypto');

passport.use(new GoogleStrategy({
        clientID: '923319509865-9qq4fm6h1rhcu749vbtinelnvbn9ejp6.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback',

    },
    function(accessToken , refreshToken , profile , done){
        
        // find the user 
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("ERROR in google stratergy passport",err);
                return ;
            }
            // console.log("PROFILE",profile);
            // console.log("ACCESS TOKEN",accessToken);
            // console.log("REFRESH TOKEN",refreshToken);


            if(user){
                // if found, set this user as req.user  
                // console.log("USER##",user)
                return done(null,user);
            }else{
                // console.log("USER NOT FOUND SO CREATING USER##")
                //if not found, create the user and set it as req.user which means(signin that user)
                User.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("ERROR in creating user google stratergy-passport",err);
                        return ;
                    }
                // console.log("USERS CREATED IN DB##")
                    return(null,user);
                });
            }
        });
    }
));