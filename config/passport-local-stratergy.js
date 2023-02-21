const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy ;
const User = require('../models/user');


passport.use(new LocalStratergy({
    usernameField:"email",
    passReqToCallback:true
},
  function(req,email, password, done) {
    User.findOne({ email: email }, function (err, user) {
    if (err) { 
        // console.log("ERROR IN FINDING USER PASSPORT-LOCAL");
        return done(err);
    }
    if (!user || user.password != password) {
        // console.log("ERROR IN MATCHING USERPASSWORD PASSPORT-LOCAL");
        return done(null, false); 
        }
        // console.log("SUCCESFULLY PASSED USER")
    return done(null,user);
    });
  }
));

//serialise user_id 
passport.serializeUser(function (user, done) {
    // console.log("SERIALISE")
    done(null, user.id);
});

//deserialise user_id
passport.deserializeUser(function (id, done) {

    User.findById(id, function (err, user) {
    if (err) {
        console.log("ERROR in finding user from courtesy to passport ");
        return done(err);
    }
    // console.log("DESERIALISE",user)
    return done(null, user);
});
});

//checkAuthentication
passport.checkAuthentication = function (req, res, next) {
// if user is signed in then pass on the request to the next function which is controller's action
    if (req.isAuthenticated()) {
        console.log("yes the request is authenticated now the next function")
        return next();
    }
// if user not signed in
// console.log("checkauthentication fail");
    return res.redirect("/users/signin");
};

//setAuthentication
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // console.log("setting user authentication as locals user ")
    // req.user contains the current signin user from the session cookie and we r just sending in locals for the views
    res.locals.user = req.user;
}
// console.log("setauthentication fail");
    next();
};

module.exports = passport ;