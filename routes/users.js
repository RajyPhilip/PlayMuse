const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require('passport');


// router.use("/users", userController.user);
router.post("/signup", userController.signup);
router.post("/signin",passport.authenticate('local',{failureRedirect:'/users/signinPage'}),userController.signin);
router.get("/signinPage",userController.signinPage);
router.get("/signupPage",userController.signupPage);
router.get("/home",userController.home);
router.get("/profile",userController.profile);
router.get("/signout",userController.signout);
router.post("/create-playlist",userController.createPlaylist);
router.post("/add-to-queue",userController.addToQueue);
router.post("/add-fav-artist",userController.addFavArtist);
router.post("/update-pass",userController.updatePassword);
router.post("/myfav-song",userController.myFavSong);
router.get("/add-to-playlist/:songid/:playlistid",userController.addToPlaylist);






    router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect:'/users/signinPage',successRedirect:'/users/home'})
    );



module.exports = router;
