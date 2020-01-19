//modules
const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');

//libraries
const check = require('./../libs/checkLib');
const generatePassword = require('./../libs/generatePasswordLib');
const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');
const time = require('./../libs/timeLib');
const validateInputParams = require('./../libs/validateInputLib');
const token = require('./../libs/tokenLib');

//models
const userModel = mongoose.model('User');
const authModel = mongoose.model('Auth');
const groupModel = mongoose.model('Group');

// create a new group
let createNewGroup = (req, res) => {

    //checking for required input
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.groupName) {
                groupModel.find({ groupName: req.body.groupName }, (err, result) => {
                    if (err) {
                        logger.error("error checking if the given group name already exists", "groupController : createNewGroup - validate", 9);
                        let apiResponse = response.generate(true, "internal err : error while checking if the group already exists", 500, err);
                        reject(apiResponse);
                        // }else if(check.isEmpty(result)){
                    } else {
                        resolve();
                    }
                    // else {
                    //     logger.error("group name already exists", "groupController : createNewGroup - validate", 9);
                    //     let apiResponse = response.generate(true, "group name already exists", 400, null);
                    //     reject(apiResponse);
                    // }
                })
            } else {
                logger.error("group name missing", "groupController : createNewGroup - validateInput", 9);
                let apiResponse = response.generate(true, "missing group name", 400, null);
                reject(apiResponse);
            }
        })
    }

    //creating new group
    let createGroup = () => {
        return new Promise((resolve, reject) => {
            let groupUserPeople = req.body.groupUsers.split(",");
            let newGroup = new groupModel({
                groupId: shortId.generate(),
                groupOwner: req.user.userId,
                groupName: req.body.groupName,
                groupUsers: groupUserPeople,
                groupCreatedOn: time.localTimeNow()
            });
            newGroup.save((err, result) => {
                if (err) {
                    logger.error("error saving new group", "groupController : createGroup", 9);
                    let apiResponse = response.generate(true, "internal err : error while saving new group", 500, err);
                    reject(apiResponse);
                } else {
                    logger.info("new group created successfully", "groupController : createGroup", 7);
                    let groupDetails = result.toObject();
                    delete groupDetails.__v;
                    delete groupDetails._id;
                    resolve(groupDetails);
                }
            })
        })
    }

    validateInput()
        .then(createGroup)
        .then((groupDetails) => {
            let apiResponse = response.generate(false, "group created successfully", 200, groupDetails);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}


//add people to groups
let addUserToGroup = (req, res) => {

    //find group
    let getGroup = () => {
        return new Promise((resolve, reject) => {
            if (req.body.groupId) {
                groupModel.findOne({ groupId: req.body.groupId }, (err, result) => {
                    if (err) {
                        logger.error("error while fetching group details", "groupController : addUserToGroup - getGroup", 9);
                        let apiResponse = response.generate(true, "internal err : error while fetching group details", 500, err);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("group not found", "groupController : addUserToGroup -getGroup", 9);
                        let apiResponse = response.generate(true, "group not found", 404, null);
                        reject(apiResponse);
                    } else {
                        let groupDetails = result.toObject();
                        delete groupDetails.__v;
                        delete groupDetails._id;
                        resolve(groupDetails);
                    }
                })
            } else {
                logger.error("groupId not provided", "groupController : addUserToGroup", 9);
                let apiResponse = response.generate(true, "groupId not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    //add user to group
    let addUser = (groupDetails) => {
        return new Promise((resolve, reject) => {
            let existingUsers = groupDetails.groupUsers;
            existingUsers.push(req.body.email);
            let updateObj = {
                groupUsers: existingUsers
            }
            groupModel.update({ groupId: groupDetails.groupId }, updateObj, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while adding user to the group", "groupController : addUserToGroup - addUser", 9);
                    let apiResponse = response.generate(true, "internal err : error while adding user to the group", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("group not found", "groupController : addUserToGroup - addUser", 9);
                    let apiResponse = response.generate(true, "group not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            })
        })
    }

    getGroup()
        .then(addUser)
        .then((resolve) => {
            let apiResponse = response.generate(false, "user added successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}

//get all groups
let getAllGroupsOfUser = (req, res) => {
    groupModel.find({ groupUsers: req.body.email })
        .select('-__v -_id')
        .exec((err, result) => {
            if (err) {
                logger.error("error while fetching users groups", "groupController : getAllGroupsOfUser", 9);
                let apiResponse = response.generate(true, "internal err : error while getting user's groups", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("no groups found for the user", "groupController : getAllGroupsOfUser", 9);
                let apiResponse = response.generate(true, "no groups of user found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("user groups found", "groupController : getAllGroupsOfUser", 9);
                let apiResponse = response.generate(false, "groups found", 200, result);
                res.send(apiResponse);
            }
        })
}

// delete group
let deleteGroup = (req, res) => {
    groupModel.remove({ groupId: req.body.groupId }, (err, result) => {
        if (err) {
            logger.error("error while deleting group", "groupController : deleteGroup", 9);
            let apiResponse = response.generate(true, "internal err : error while deleting the group", 500, err);
            res.send(apiResponse);
        } else if (result.n == 0) {
            logger.error("no group found", "groupController : deleteGroup", 9);
            let apiResponse = response.generate(true, "group not found to delete", 404, null);
            res.send(apiResponse);
        } else {
            logger.info("group deleted successfully", "groupController : deleteGroup", 9);
            let apiResponse = response.generate(false, "group deleted successfully", 200, result);
            res.send(apiResponse);
        }
    })
}

//get a group's detail
let getGroupDetails = (req, res) => {
    groupModel.find({ groupId: req.body.groupId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error("error while retreiving group details", "groupController : getGroupDetails", 9);
                let apiResponse = response.generate(true, "internal err : error while retreiving group details", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("group details not found", "groupController : getGroupDetails", 9);
                let apiResponse = response.generate(true, "group details not found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("group details found", "groupController : getGroupDetails", 9);
                let apiResponse = response.generate(false, "group details found", 200, result);
                res.send(apiResponse);
            }
        })
}

//get all groups
let getAllGroups = (req, res) => {
    groupModel.find()
        .select('-__v -_id')
        .exec((err, result) => {
            if (err) {
                logger.error("error while fetching users groups", "groupController : getAllGroupsOfUser", 9);
                let apiResponse = response.generate(true, "internal err : error while getting user's groups", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("no groups found for the user", "groupController : getAllGroupsOfUser", 9);
                let apiResponse = response.generate(true, "no groups of user found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("user groups found", "groupController : getAllGroupsOfUser", 9);
                let apiResponse = response.generate(false, "groups found", 200, result);
                res.send(apiResponse);
            }
        })
}

module.exports = {
    createNewGroup: createNewGroup,
    addUserToGroup: addUserToGroup,
    getAllGroupsOfUser: getAllGroupsOfUser,
    getGroupDetails: getGroupDetails,
    getAllGroups: getAllGroups,
    deleteGroup: deleteGroup
}