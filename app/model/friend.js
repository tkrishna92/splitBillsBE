const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FriendSchema = new Schema({
    requesterId : {type : String, required : true},
    requesterName : {type : String},
    requesterRoom : {type : String},
    accepterId : {type : String},
    accepterName : {type : String},
    accepterRoom : {type : String},
    isFriend : {type : String, default : false}
});

mongoose.model('Friend', FriendSchema);