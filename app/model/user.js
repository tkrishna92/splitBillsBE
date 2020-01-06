const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userId : {type : String, default : '', index : true, unique : true},
    password : {type : String},
    firstName : {type : String, default : ''},
    lastName : {type : String, default : ''},
    email : {type : String, default : ''},
    country : {type : String, default : ''},
    mobileNumber : {type : String, default : ''},
    createdOn : {type : String}
})

mongoose.model('User', UserSchema);