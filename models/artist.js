const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image:{
    type: String,
  },
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
