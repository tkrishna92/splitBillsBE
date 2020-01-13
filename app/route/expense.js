const express = require('express');
const controller = require('./../controller/expenseController');
const appConfig = require('./../../config/appConfig');
const auth = require('./../middleware/auth');

let setRouter = (app)=>{
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


    }

    module.exports = {
        setRouter : setRouter
    }