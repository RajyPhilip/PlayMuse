const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    require:true
  },
  songid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'allsongs',
    require:true
  }
});

const Queue = mongoose.model("queue", queueSchema);
module.exports = Queue;
