const mongoose = require('mongoose');
const events = require('events');
const socketio = require('socket.io');
const eventEmitter = new events.EventEmitter();

//libs and modules
const logger = require('./loggerLib');
const check = require('./checkLib');
const token = require('./tokenLib');
const response = require('./responseLib');
const shortid = require('shortid');

//models
const friendModel = mongoose.model('Friend');
const userModel = mongoose.model('User');

let setServer = (server)=>{

}

module.exports = {
    setServer : setServer
}