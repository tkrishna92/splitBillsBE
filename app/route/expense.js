const express = require('express');
const controller = require('./../controller/expenseController');
const appConfig = require('./../../config/appConfig');
const auth = require('./../middleware/auth');

let setRouter = (app) => {
    let expenseUrl = `${appConfig.apiVersion}/expense`;

    //createNewExpense : this creates a new expense
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : title, description, amount, paidBy, involvedMembers
    app.post(`${expenseUrl}/createNewExpense`, auth.isAuthenticated, controller.createNewExpense);
    /**
     * @api {post} /expense/createNewExpense create new expense
     * @apiVersion 1.0.0
     * @apiGroup expense
     * 
     * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
     * @apiParam {String} groupId id of the group in which the expense has to be added to be passed as a body parameter
     * @apiParam {String} title a short title for the expense to be passed as a body parameter
     * @apiParam {String} description a description of the expense to be passed as a body paramter
     * @apiParam {Number} amount the amount involved in the expense
     * @apiParam {String} paidBy userId of the person who paid for the expense
     * @apiParam {String} involvedMembers a string of userIds of the people involved in the expense
     * @apiParam {String} userName name of the user who created the expense
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "expense generated successfully",
            "status": 200,
            "data": {
                "expenseDescription": "exp desc 1",
                "expenseModifiedBy": "",
                "expenseCreatedOn": "2020-01-13T17:40:57.000Z",
                "expenseModifiedOn": null,
                "expenseMembers": [
                    "INKSPp4R",
                    "LBoVC_eJ",
                    "p_wJP6TV"
                ],
                "expensePreviousIds": [],
                "expenseId": "o4ZgIEiN",
                "expenseGroup": "KjaxYzzo",
                "expenseTitle": "expense 1",
                "expenseCreatedBy": "p_wJP6TV",
                "expenseCreatedByName": "user name",
                "expenseAmount": 1000,
                "expensePaidBy": "p_wJP6TV",
                "expenseIsCurrentVersion": true
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "missing required input",
            "status": 400,
            "data": null
        }
     * 
     */

    //getAllExpenses 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    app.get(`${expenseUrl}/getAllExpenses`, auth.isAuthenticated, controller.getAllExpenses);
    /**
    * @api {post} /expense/getAllExpenses get all expenses
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "expenses retreived successfully",
           "status": 200,
           "data": [
               {
                   "expenseDescription": "exp desc 1",
                   "expenseModifiedBy": "",
                   "expenseCreatedOn": "2020-01-13T17:06:14.000Z",
                   "expenseModifiedOn": null,
                   "expenseMembers": [
                       "INKSPp4R",
                       "LBoVC_eJ",
                       "p_wJP6TV"
                   ],
                   "expensePreviousIds": [],
                   "expenseId": "E5IdvTyo",
                   "expenseGroup": "KjaxYzzo",
                   "expenseTitle": "expense 1",
                   "expenseCreatedBy": "p_wJP6TV",
                   "expenseCreatedByName": "user name",
                   "expenseAmount": 1000,
                   "expensePaidBy": "p_wJP6TV",
                   "expenseIsCurrentVersion": true
               }
           ]
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "no expenses found",
           "status": 404,
           "data": null
       }
    */

    //getAllGroupExpenses 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : groupId : groupId of the expenses are being requested for
    app.post(`${expenseUrl}/getAllGroupExpenses`, auth.isAuthenticated, controller.getAllGroupExpenses);
    /**
    * @api {post} /expense/getAllGroupExpenses get all expenses of the group
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} groupId groupId of which the expenses are required to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "expenses retreived successfully",
           "status": 200,
           "data": [
               {
                   "expenseDescription": "exp desc 1",
                   "expenseModifiedBy": "",
                   "expenseCreatedOn": "2020-01-13T17:06:14.000Z",
                   "expenseModifiedOn": null,
                   "expenseMembers": [
                       "INKSPp4R",
                       "LBoVC_eJ",
                       "p_wJP6TV"
                   ],
                   "expensePreviousIds": [],
                   "expenseId": "E5IdvTyo",
                   "expenseGroup": "KjaxYzzo",
                   "expenseTitle": "expense 1",
                   "expenseCreatedBy": "p_wJP6TV",
                   "expenseCreatedByName": "user name",
                   "expenseAmount": 1000,
                   "expensePaidBy": "p_wJP6TV",
                   "expenseIsCurrentVersion": true
               }
           ]
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "no expenses found",
           "status": 404,
           "data": null
       }
    */

    //getAllExpenseBalance 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense, whose balances are being requested for
    app.post(`${expenseUrl}/getAllExpenseBalance`, auth.isAuthenticated, controller.getAllExpenseBalance);
    /**
    * @api {post} /expense/getAllExpenseBalance get all balances of the expense
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of expense whose balances are requested to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "balances retreived successfully",
           "status": 200,
           "data": [
               {
                   "balanceId": "Pq63bx7KP",
                   "expenseId": "KZFGnJ_W",
                   "payee": "p_wJP6TV",
                   "owedBy": "LBoVC_eJ",
                   "debtAmount": 333,
                   "expenseSettled": false
               },
               {
                   "balanceId": "BYndyrmTn",
                   "expenseId": "KZFGnJ_W",
                   "payee": "p_wJP6TV",
                   "owedBy": "p_wJP6TV",
                   "debtAmount": 333,
                   "expenseSettled": false
               },
               {
                   "balanceId": "I0hiM33Vk",
                   "expenseId": "KZFGnJ_W",
                   "payee": "p_wJP6TV",
                   "owedBy": "INKSPp4R",
                   "debtAmount": 333,
                   "expenseSettled": false
               }
           ]
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "no balances found",
           "status": 404,
           "data": null
       }
    */

    //deleteExpense 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense which is being deleted
    app.put(`${expenseUrl}/deleteExpense`, auth.isAuthenticated, controller.deleteExpense);
    /**
    * @api {post} /expense/deleteExpense delete expense and all the balances involved
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of the expense which is being deleted to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "expense deleted successfully",
           "status": 200,
           "data": {
               "n": 1,
               "ok": 1,
               "deletedCount": 1,
               "balanceResult": {
                   "n": 3,
                   "ok": 1,
                   "deletedCount": 3
               }
           }
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "expense already deleted",
           "status": 404,
           "data": null
       }
    */

    //getExpenseDetails 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of expense whose details are being requested to be passed as a body paramter
    app.put(`${expenseUrl}/getExpenseDetails`, auth.isAuthenticated, controller.getExpenseDetails);
    /**
    * @api {post} /expense/getExpenseDetails get expense details of the selected expense
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of the expense for which the details are being requested to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "expense retreived successfully",
           "status": {
               "expenseDescription": "exp desc 1",
               "expenseModifiedBy": "",
               "expenseCreatedOn": "2020-01-15T11:00:30.000Z",
               "expenseModifiedOn": null,
               "expenseIsCurrentVersion": true,
               "expenseId": "bqaTcuzG",
               "expenseGroup": "dGIFkbOn",
               "expenseTitle": "expense 1",
               "expenseCreatedBy": "LBoVC_eJ",
               "expenseCreatedByName": "user name",
               "expenseAmount": 1000,
               "expensePaidBy": "p_wJP6TV",
               "expenseMembers": [
                   "INKSPp4R",
                   "LBoVC_eJ",
                   "p_wJP6TV"
               ]
           }
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "expense not found",
           "status": 404,
           "data": null
       }
    */

    //deleteAllExpensesOfGroup 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : groupId : groupId of the group from which all expenses are being deleted
    app.put(`${expenseUrl}/deleteAllExpensesOfGroup`, auth.isAuthenticated, controller.deleteAllExpensesOfGroup);
    /**
    * @api {post} /expense/deleteAllExpensesOfGroup delete all group expenses
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} groupId groupId of the group from which all expenses are being deleted to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "expense deleted successfully",
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
           "message": "expense already deleted",
           "status": 404,
           "data": null
       }
    */


    //editExpensePayee 
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense, whose payee is being edited
    //params : userName : name of the user editing the field
    //params : paidBy : userId of the new payee
    //params : paidByUserName : user name of the new payee
    app.post(`${expenseUrl}/editExpensePayee`, auth.isAuthenticated, controller.editExpensePayee);
    /**
    * @api {post} /expense/editExpensePayee edit expense payee
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of expense which is being updated to be passed as body parameter
    * @apiParam {String} userName userName of the person making the request to be passed as body parameter
    * @apiParam {String} paidBy userId of the new payee to be passed as body parameter
    * @apiParam {String} paidByUserName user name of the new payee to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "updated payee successfully",
           "status": 200,
           "data": {
               "n": 3,
               "nModified": 0,
               "ok": 1
           }
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "balances not found",
           "status": 404,
           "data": null
       }
    */


    //editExpenseAmount
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense, whose payee is being edited
    //params : userName : name of the user editing the field
    //params : newAmount : new amount that needs to be updated
    app.post(`${expenseUrl}/editExpenseAmount`, auth.isAuthenticated, controller.editExpenseAmount);
    /**
    * @api {post} /expense/editExpenseAmount edit expense amount
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of expense which is being updated to be passed as body parameter
    * @apiParam {String} userName userName of the person making the request to be passed as body parameter
    * @apiParam {String} newAmount new amount that needs to be updated as expense
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "updated payee successfully",
           "status": 200,
           "data": {
               "n": 3,
               "nModified": 3,
               "ok": 1
           }
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "balances not found",
           "status": 404,
           "data": null
       }
    */

    //addUsersToExpense
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense, whose payee is being edited
    //params : userName : name of the user editing the field
    //params : addedUsers : userIds of the new users that need to be added to the expense to be passed as a string of CSV's 
    //params : addedUsersNames : user names of the new users that need to be added to the expense to be passed as a string of CSV's
    app.post(`${expenseUrl}/addUsersToExpense`, auth.isAuthenticated, controller.addUsersToExpense);
    /**
    * @api {post} /expense/addUsersToExpense add users to expense
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of expense which is being updated to be passed as body parameter
    * @apiParam {String} userName userName of the person making the request to be passed as body parameter
    * @apiParam {String} addedUsers userIds of the new users that need to be added to the expense to be passed as a string of CSV's to be passed as body parameter
    * @apiParam {String} addedUsersNames user names of the new users that need to be added to the expense to be passed as a string of CSV's to be passed as a body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "updated new users successfully",
           "status": 200,
           "data": {
               "_id": "5e22dd762808a72530a2b940",
               "expenseDescription": "exp desc 1",
               "expenseModifiedBy": "LBoVC_eJ",
               "expenseCreatedOn": "2020-01-18T10:27:02.000Z",
               "expenseModifiedOn": "2020-01-18T10:35:12.000Z",
               "expenseIsCurrentVersion": true,
               "expenseId": "iWmDVKgw",
               "expenseGroup": "Xm-qIEsy",
               "expenseTitle": "add users 1",
               "expenseCreatedBy": "LBoVC_eJ",
               "expenseCreatedByName": "f3 l3",
               "expenseAmount": 1000,
               "expensePaidBy": "p_wJP6TV",
               "expenseMembers": [
                   "INKSPp4R",
                   "p_wJP6TV",
                   "LBoVC_eJ"
               ],
               "expenseLatestModification": [
                   "f3 l3 created a new expense add users 1",
                   "f3 l3 added f1 l1, f2 l2 to add users 1"
               ],
               "__v": 0,
               "expenseModifiedByName": "f3 l3"
           }
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "balances not found",
           "status": 404,
           "data": null
       }
    */

    //removeUsersFromExpense
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense, whose payee is being edited
    //params : userName : name of the user editing the field
    //params : removeUsers : userIds of the users that need to be removed from the expense to be passed as a string of CSV's 
    //params : removeUsersNames : user names of the users that need to be removed from the expense to be passed as a string of CSV's
    app.post(`${expenseUrl}/removeUsersFromExpense`, auth.isAuthenticated, controller.removeUsersFromExpense);
    /**
    * @api {post} /expense/removeUsersFromExpense remove users from expense
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of expense which is being updated to be passed as body parameter
    * @apiParam {String} userName userName of the person making the request to be passed as body parameter
    * @apiParam {String} removeUsers userIds of the users that need to be removed from the expense to be passed as a string of CSV's to be passed as body parameter
    * @apiParam {String} removeUsersNames user names of the users that need to be removed from the expense to be passed as a string of CSV's to be passed as a body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "users removed from expense successfully",
           "status": 200,
           "data": [
               {
                   "expenseMembers": [
                       "LBoVC_eJ"
                   ],
                   "removingMembers": [
                       "p_wJP6TV"
                   ],
                   "newDebtAmount": 1000
               }
           ]
       }
    * 
    * @apiErrorExample {json} Error-Response:
    * {
           "errorOccurred": true,
           "message": "balances not found",
           "status": 404,
           "data": null
       }
    */

    //settleUserExpense
    //params : authToken : authToken of the user try to access the route to be passed as body, header or query parameter
    //params : expenseId : expenseId of the expense, whose payee is being edited
    //params : userName : name of the user editing the field
    //params : payeeName : name of the payee of the expense to be passed as a body paramter
    app.post(`${expenseUrl}/settleUserExpense`, auth.isAuthenticated, controller.settleUserExpense);
    /**
    * @api {post} /expense/settleUserExpense settle user's expense
    * @apiVersion 1.0.0
    * @apiGroup expense
    * 
    * @apiParam {String} authToken authToken to be passed as a body, header or query parameter
    * @apiParam {String} expenseId expenseId of expense which is being updated to be passed as body parameter
    * @apiParam {String} userName user name of the person making the request to be passed as body parameter
    * @apiParam {String} payeeName name of the payee for the expense to be passed as body parameter
    * 
    * @apiSuccessExample {json} Success-Response:
    * {
           "errorOccurred": false,
           "message": "settlement updated successfully",
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
           "message": "expense balance for the user not found or already settled",
           "status": 404,
           "data": null
       }
    */

}

module.exports = {
    setRouter: setRouter
}