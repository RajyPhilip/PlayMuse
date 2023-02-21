const mongoose = require("mongoose");

const PlayListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  song: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Song'
  }],
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

const Playlist = mongoose.model("Allplaylist", PlayListSchema);
module.exports = Playlist;
