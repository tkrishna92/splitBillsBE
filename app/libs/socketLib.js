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
const userModel = mongoose.model('User');
const groupModel = mongoose.model('Group');

let setServer = (server)=>{

    let io = socketio.listen(server);

    let myIo = io.of('');

    myIo.on('connection', (socket)=>{
        console.log("connection established successfully - emitting verify user");

        let userGroups = [];
        
        socket.emit('verifyUser', '');

        socket.on('auth-user', (authToken)=>{

            token.verifyWithoutSecretKey(authToken, (err, user)=>{
                if(err){
                    socket.emit("error-occurred", {status : 500, error : "invalid token provided"});
                }else {
                    let currentUser = user.data;
                    console.log(currentUser);
                    socket.userId = currentUser.userId;
                    socket.email = currentUser.email;
                }
            })
        })

        //as soon as the user is verified the client emits "join-group-room" for every group they are part of 
        // this will help create a communication of all the notifications of the group
        socket.on('join-group-room',(groupIdList)=>{
            let userGroups = groupIdList;
            userGroups.forEach((group)=>{
                socket.join(group);
            })
        })

        //on any group action receive event "group-action" and emit "action-notification" on the group room
        socket.on("group-action",(data)=>{
            console.log("group action event received : "+data);
            let groupId = data.groupId;
            socket.to(groupId).broadcast.emit('action-notification', data.notification);
        })

        //on disconnect leave all the group rooms the user is a part of
        socket.on('disconnect', ()=>{
           groupModel.find({groupUsers : socket.email})
            .lean()
            .exec((err, result)=>{
                if(err){
                    logger.error("error while retreiving groups of users", "socketLib : on disconnect event - while retreiving user groups", 9);
                    socket.emit("error-occurred", {status : 500, error : "unable to disconnect from group notifications"})
                }else if(check.isEmpty(result)){
                    logger.info("user has not joined any group rooms", "socketLib : on disconnect event - while retreiving user groups", 9);
                }else {
                    result.map((group)=>{
                        socket.leave(group.groupId);
                    })
                }
            })
        })

    })


}

module.exports = {
    setServer : setServer
}