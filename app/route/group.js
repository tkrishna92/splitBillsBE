const express = require('express');
const controller = require('./../controller/groupController');
const appConfig = require('./../../config/appConfig');
const auth = require('./../middleware/auth');

let setRouter = (app) => {
    let groupUrl = `${appConfig.apiVersion}/group`;

    //createNewGroup : this creates a new group with the given group name and the user creating as owner
    //params : groupName, groupUsers
    app.post(`${groupUrl}/createNewGroup`, auth.isAuthenticated, controller.createNewGroup);
    /**
     * @api {post} /group/createNewGroup create new group
     * @apiVersion 1.0.0
     * @apiGroup group
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} groupName a name for the group to be passed as a body parameter
     * @apiParam {String} groupUsers a string of users userId/s to be passed a comma seperated string as a body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "group created successfully",
            "status": 200,
            "data": {
                "groupUsers": [
                    "p_wJP6TV",
                    "LBoVC_eJ",
                    "12BS5-tX"
                ],
                "groupCreatedOn": "2020-01-09T13:09:50.000Z",
                "groupName": "group 1",
                "groupExpenses": [],
                "groupSettled": false,
                "groupId": "WlGBT1T_",
                "groupOwner": "LBoVC_eJ"
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "group name already exists",
            "status": 400,
            "data": null
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "missing group name",
            "status": 400,
            "data": null
        }
     */


    //getAllGroupsOfUser : gets all the groups the user is a member of
    //params : authToken : can be passed as body, query or header parameter
    //params : email : email of the user requesting the groups
    app.put(`${groupUrl}/getAllGroupsOfUser`, auth.isAuthenticated, controller.getAllGroupsOfUser);
    /**
     * @api {post} /group/getAllGroupsOfUser get all groups of user
     * @apiVersion 1.0.0
     * @apiGroup group
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} email email of the user requesting the groups
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "groups found",
            "status": 200,
            "data": [
                {
                    "groupUsers": [
                        "p_wJP6TV",
                        "LBoVC_eJ",
                        "12BS5-tX"
                    ],
                    "groupCreatedOn": "2020-01-09T13:08:23.000Z",
                    "groupName": "first group",
                    "groupExpenses": [],
                    "groupSettled": false,
                    "groupId": "JRUhLJfP",
                    "groupOwner": "LBoVC_eJ"
                },
                ....
                {
                    "groupUsers": [
                        "p_wJP6TV",
                        "LBoVC_eJ",
                        "12BS5-tX"
                    ],
                    "groupCreatedOn": "2020-01-09T13:09:50.000Z",
                    "groupName": "group 1",
                    "groupExpenses": [],
                    "groupSettled": false,
                    "groupId": "WlGBT1T_",
                    "groupOwner": "LBoVC_eJ"
                }
            ]
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "User's authentication details not found",
            "status": 404,
            "data": null
        }
     */

    //getAllGroups : gets all the groups, can be used for administration purposes
    //params : authToken : can be passed as body, query or header parameter
    app.get(`${groupUrl}/getAllGroups`, auth.isAuthenticated, controller.getAllGroups);
    /**
     * @api {post} /group/getAllGroup get all groups
     * @apiVersion 1.0.0
     * @apiGroup group
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} email email of the user requesting the groups
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "groups found",
            "status": 200,
            "data": [
                {
                    "groupUsers": [
                        "p_wJP6TV",
                        "LBoVC_eJ",
                        "12BS5-tX"
                    ],
                    "groupCreatedOn": "2020-01-09T13:08:23.000Z",
                    "groupName": "first group",
                    "groupExpenses": [],
                    "groupSettled": false,
                    "groupId": "JRUhLJfP",
                    "groupOwner": "LBoVC_eJ"
                },
                ....
                {
                    "groupUsers": [
                        "p_wJP6TV",
                        "LBoVC_eJ",
                        "12BS5-tX"
                    ],
                    "groupCreatedOn": "2020-01-09T13:09:50.000Z",
                    "groupName": "group 1",
                    "groupExpenses": [],
                    "groupSettled": false,
                    "groupId": "WlGBT1T_",
                    "groupOwner": "LBoVC_eJ"
                }
            ]
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "User's authentication details not found",
            "status": 404,
            "data": null
        }
     */


    //addUserToGroup : to add a user to the group
    //params : authToken : can be passed as body, query or header parameter
    //params : groupId : id of the group to which the user has to be added to be passed as body parameter
    //params : email : email of the user who has to be added to the group to be passed as body parameter
    app.post(`${groupUrl}/addUserToGroup`, auth.isAuthenticated, controller.addUserToGroup);
    /**
     * @api {post} /group/getAllGroupsOfUser get all groups of user
     * @apiVersion 1.0.0
     * @apiGroup group
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} groupId groupId to be passed as body parameter
     * @apiParam {String} email email of the user to be added to the group should be passed as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "user added successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "group not found",
            "status": 404,
            "data": null
        }
     */

    //getGroupDetails : get details of a group
    //params : authToken : can be passed as body, query or header parameter
    //params : groupId : id of the group to which the user has to be added to be passed as body parameter
    app.post(`${groupUrl}/getGroupDetails`, auth.isAuthenticated, controller.getGroupDetails);
    /**
     * @api {post} /group/getGroupDetails get details of the group
     * @apiVersion 1.0.0
     * @apiGroup group
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} groupId groupId to be passed as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "group details found",
            "status": 200,
            "data": [
                {
                    "groupUsers": [
                        "p_wJP6TV",
                        "LBoVC_eJ",
                        "12BS5-tX",
                        "INKSPp4R"
                    ],
                    "groupCreatedOn": "2020-01-09T13:09:20.000Z",
                    "groupName": "group 2",
                    "groupExpenses": [],
                    "groupSettled": false,
                    "groupId": "mceMdh5Z",
                    "groupOwner": "LBoVC_eJ"
                }
            ]
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "group details not found",
            "status": 404,
            "data": null
        }
     */

    //deleteGroup : deletes the selected group
    //params : authToken : can be passed as body, query or header parameter
    //params : groupId : groupId of the group to be deleted
    app.put(`${groupUrl}/deleteGroup`, auth.isAuthenticated, controller.deleteGroup);
    /**
     * @api {post} /group/getAllGroupsOfUser get all groups of user
     * @apiVersion 1.0.0
     * @apiGroup group
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} groupId groupId of the user requesting the groups
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "group deleted successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1,
                "deletedCount": 1
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "group not found to delete",
            "status": 404,
            "data": null
        }
     */

}

module.exports = {
    setRouter: setRouter
}