const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type : String , 
        required : true
    },
    email:{
        type : String,
        required : true , 
        unique : true ,
    },
    password :{
        type : String ,
        required :true
    },
    playlist :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Song'
    }],
    queues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Song'
    }] ,
    favartist :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Artist'
    }],
    favsongs :[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Song'
    }],
},{
    timestamp : true
});


const User = mongoose.model('User', userSchema);
module.exports =User ;