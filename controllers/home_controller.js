const Song = require("../models/song");

module.exports.landing = async (req, res) => {
      if(req.isAuthenticated()){
        return  res.redirect('/users/home')
  }
  return res.render('landingPage')
};
