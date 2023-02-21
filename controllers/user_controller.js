const User = require("../models/user");
const Songs = require('../models/song');
const Playlist = require('../models/playlist');
const Queue = require('../models/queues');
const allArtist = require('../models/artist');
// userhome page
module.exports.home = async (req,res)=>{
  try {
    //need to send user by populating everything required
    let user = await User.findById({_id: req.user._id});
        let allSongs = await Songs.find({});
        console.log("REACHED HOME")
        // let myplaylist = await Playlist.find({userid:req.user.id});
        let artists = await allArtist.find({});
        // console.log("ALLSONGS HOME",allSongs)
        let playlist = await Playlist.find({userid:req.user.id});
        if(req.isAuthenticated()){

          return  res.render('home',{
          allSongs: allSongs,
          allartist: artists,
          myPlayList:playlist
          });
        }
  return res.render('sign_in');

  } catch (error) {
    console.log("ERRORRR IN HOME LOADING" ,error)
  }
}
//signin page
module.exports.signinPage = function(req,res){
    if(req.isAuthenticated()){
        return  res.redirect('/users/home')
  } 
  return res.render("sign_in") ;
}
//signup page
module.exports.signupPage = function(req,res){
    if(req.isAuthenticated()){
        return  res.redirect('/users/home')
  }
  return res.render("sign_up") ;
}
//userProfile page
module.exports.profile = async (req,res)=>{
      if(req.isAuthenticated()){
        return  res.render('profile')
  } 
  return res.render('sign_in');
}
//logout 
module.exports.signout = async (req,res)=>{
  console.log("logging out",req.user.id)
  let deleteque= await Queue.deleteMany({userid:req.user.id});
  req.logout(function(err){
    if(err){
      console.log("ERROR LOGGING OUT",err)
    }
  return res.redirect('/users/signinPage');
  });
  
}
//signin check nd user signing in
module.exports.signin = async (req, res)=> {
  return res.redirect('/users/home');
};

//signingup nd saving data in db  
module.exports.signup = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("REached");
    return res.redirect("back");
  }
  // const hashpassword = bcrypt.hashSync(req.body.password, 10);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("ERROR in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          if (err) {
            console.log("ERROR in creating user");
            return;
          }

          return res.render("sign_in");
        }
      );
    } else {
      res.redirect("back");
    }
  });
};




//// creating playlist
module.exports.createPlaylist = async (req,res)=>{
  try {
    let user = await User.findById({_id: req.user._id})
    console.log("####",user)
    let playlists = await Playlist.create({
      title : req.body.name,
      userid : req.user.id
    },function(err,playlist){
      if(err){
        console.log("error in adding playlist to user myplaylist array")
      }
      user.playlist.push(playlist);
      user.save();
    })
    console.log("CREATED PLAYLIST IN DB ")
    return res.redirect('back')
  } catch (error) {
    console.log("ERROR IN CREATING PLAYLIST IN DB ",error)
  }
}


// reset or update pass
module.exports.updatePassword = async (req,res)=>{
 console.log("**** REACHED")
  try {
      if(req.body.password != req.body.confirmPassword){
    return res.render('profile');
    console.log("RRR")
  }
  
  let user = await User.findById(req.user.id);
  await user.updateOne({password:req.body.password});
  await user.save();
  return res.redirect('/users/signout')
  } catch (error) {
    console.log("ERROR IN UPDATING PASSWORD" , error)
  }

}  

/// adding my fav song 
module.exports.myFavSong = async (req,res) => {
      try {
    let user = await User.findById({_id: req.user._id});
    // console.log("####",user)
    if(user.favsongs.includes(req.body.name)){
      user.favsongs.pull(req.body.name);
      console.log("Succesfully pulled");
    }else{
      user.favsongs.push(req.body.name);
      console.log("Succesfully pushed");
    }
    user.save();
    return res.redirect('back')
  } catch (error) {
    console.log("ERROR IN CREATING PLAYLIST IN DB ",error)
  }
}

//adding to queue
module.exports.addToQueue = async (req,res)=>{

  try {
    let user = req.user ;
     let queue= await Queue.create({
      userid:req.user._id,
      songid:req.body.song_id_for_queue
        })
        user.queues.push(queue);
        user.save() ;
      return res.redirect("back");
  } catch (error) {
    console.log("error in adding into queue",error)
  }
}

// add fav artist
module.exports.addFavArtist = async function(req,res){
  // get the user nd add the value from triggering point  in it array of favartist but check if its already present in array if present then dont put in array if not present then put it in array 
    try {
    let user = await User.findById(req.user.id);
    if(user.favartist.includes(req.body.name)){
      user.favartist.pull(req.body.name);
      console.log("Succesfully pulled");
    }else{
      user.favartist.push(req.body.name);
      console.log("Succesfully pushed");
    }
    user.save();
    return res.redirect('back')
  } catch (error) {
    console.log("ERROR IN ADDING OR PULLING",error)
  }
}

module.exports.addToPlaylist = async(req,res)=> {
  try {
    // playlist find krna hai 
    let {songid,playlistid} = req.params ;
    let playlist = await Playlist.findById(playlistid);
    playlist.song.push(songid);
    playlist.save();
    
    return res.redirect('back');
    // phir us playlist k song array mh push krna hai  

  } catch (error) {
    console.log("ERROR In adding song to playlist",error)
  }
}