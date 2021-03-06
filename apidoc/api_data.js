define({ "api": [
  {
    "type": "post",
    "url": "/expense/addUsersToExpense",
    "title": "add users to expense",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of expense which is being updated to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the person making the request to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedUsers",
            "description": "<p>userIds of the new users that need to be added to the expense to be passed as a string of CSV's to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedUsersNames",
            "description": "<p>user names of the new users that need to be added to the expense to be passed as a string of CSV's to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"updated new users successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"_id\": \"5e22dd762808a72530a2b940\",\n               \"expenseDescription\": \"exp desc 1\",\n               \"expenseModifiedBy\": \"LBoVC_eJ\",\n               \"expenseCreatedOn\": \"2020-01-18T10:27:02.000Z\",\n               \"expenseModifiedOn\": \"2020-01-18T10:35:12.000Z\",\n               \"expenseIsCurrentVersion\": true,\n               \"expenseId\": \"iWmDVKgw\",\n               \"expenseGroup\": \"Xm-qIEsy\",\n               \"expenseTitle\": \"add users 1\",\n               \"expenseCreatedBy\": \"LBoVC_eJ\",\n               \"expenseCreatedByName\": \"f3 l3\",\n               \"expenseAmount\": 1000,\n               \"expensePaidBy\": \"p_wJP6TV\",\n               \"expenseMembers\": [\n                   \"INKSPp4R\",\n                   \"p_wJP6TV\",\n                   \"LBoVC_eJ\"\n               ],\n               \"expenseLatestModification\": [\n                   \"f3 l3 created a new expense add users 1\",\n                   \"f3 l3 added f1 l1, f2 l2 to add users 1\"\n               ],\n               \"__v\": 0,\n               \"expenseModifiedByName\": \"f3 l3\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"balances not found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseAdduserstoexpense"
  },
  {
    "type": "post",
    "url": "/expense/createNewExpense",
    "title": "create new expense",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>id of the group in which the expense has to be added to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>a short title for the expense to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>a description of the expense to be passed as a body paramter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>the amount involved in the expense</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paidBy",
            "description": "<p>userId of the person who paid for the expense</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "involvedMembers",
            "description": "<p>a string of userIds of the people involved in the expense</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>name of the user who created the expense</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"expense generated successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"expenseDescription\": \"exp desc 1\",\n                \"expenseModifiedBy\": \"\",\n                \"expenseCreatedOn\": \"2020-01-13T17:40:57.000Z\",\n                \"expenseModifiedOn\": null,\n                \"expenseMembers\": [\n                    \"INKSPp4R\",\n                    \"LBoVC_eJ\",\n                    \"p_wJP6TV\"\n                ],\n                \"expensePreviousIds\": [],\n                \"expenseId\": \"o4ZgIEiN\",\n                \"expenseGroup\": \"KjaxYzzo\",\n                \"expenseTitle\": \"expense 1\",\n                \"expenseCreatedBy\": \"p_wJP6TV\",\n                \"expenseCreatedByName\": \"user name\",\n                \"expenseAmount\": 1000,\n                \"expensePaidBy\": \"p_wJP6TV\",\n                \"expenseIsCurrentVersion\": true\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"missing required input\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseCreatenewexpense"
  },
  {
    "type": "post",
    "url": "/expense/deleteAllExpensesOfGroup",
    "title": "delete all group expenses",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId of the group from which all expenses are being deleted to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"expense deleted successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"ok\": 1,\n               \"deletedCount\": 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"expense already deleted\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseDeleteallexpensesofgroup"
  },
  {
    "type": "post",
    "url": "/expense/deleteExpense",
    "title": "delete expense and all the balances involved",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of the expense which is being deleted to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"expense deleted successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"ok\": 1,\n               \"deletedCount\": 1,\n               \"balanceResult\": {\n                   \"n\": 3,\n                   \"ok\": 1,\n                   \"deletedCount\": 3\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"expense already deleted\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseDeleteexpense"
  },
  {
    "type": "post",
    "url": "/expense/editExpenseAmount",
    "title": "edit expense amount",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of expense which is being updated to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the person making the request to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newAmount",
            "description": "<p>new amount that needs to be updated as expense</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"updated payee successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 3,\n               \"nModified\": 3,\n               \"ok\": 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"balances not found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseEditexpenseamount"
  },
  {
    "type": "post",
    "url": "/expense/editExpensePayee",
    "title": "edit expense payee",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of expense which is being updated to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the person making the request to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paidBy",
            "description": "<p>userId of the new payee to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paidByUserName",
            "description": "<p>user name of the new payee to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"updated payee successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 3,\n               \"nModified\": 0,\n               \"ok\": 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"balances not found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseEditexpensepayee"
  },
  {
    "type": "post",
    "url": "/expense/getAllExpenseBalance",
    "title": "get all balances of the expense",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of expense whose balances are requested to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"balances retreived successfully\",\n           \"status\": 200,\n           \"data\": [\n               {\n                   \"balanceId\": \"Pq63bx7KP\",\n                   \"expenseId\": \"KZFGnJ_W\",\n                   \"payee\": \"p_wJP6TV\",\n                   \"owedBy\": \"LBoVC_eJ\",\n                   \"debtAmount\": 333,\n                   \"expenseSettled\": false\n               },\n               {\n                   \"balanceId\": \"BYndyrmTn\",\n                   \"expenseId\": \"KZFGnJ_W\",\n                   \"payee\": \"p_wJP6TV\",\n                   \"owedBy\": \"p_wJP6TV\",\n                   \"debtAmount\": 333,\n                   \"expenseSettled\": false\n               },\n               {\n                   \"balanceId\": \"I0hiM33Vk\",\n                   \"expenseId\": \"KZFGnJ_W\",\n                   \"payee\": \"p_wJP6TV\",\n                   \"owedBy\": \"INKSPp4R\",\n                   \"debtAmount\": 333,\n                   \"expenseSettled\": false\n               }\n           ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"no balances found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseGetallexpensebalance"
  },
  {
    "type": "post",
    "url": "/expense/getAllExpenses",
    "title": "get all expenses",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"expenses retreived successfully\",\n           \"status\": 200,\n           \"data\": [\n               {\n                   \"expenseDescription\": \"exp desc 1\",\n                   \"expenseModifiedBy\": \"\",\n                   \"expenseCreatedOn\": \"2020-01-13T17:06:14.000Z\",\n                   \"expenseModifiedOn\": null,\n                   \"expenseMembers\": [\n                       \"INKSPp4R\",\n                       \"LBoVC_eJ\",\n                       \"p_wJP6TV\"\n                   ],\n                   \"expensePreviousIds\": [],\n                   \"expenseId\": \"E5IdvTyo\",\n                   \"expenseGroup\": \"KjaxYzzo\",\n                   \"expenseTitle\": \"expense 1\",\n                   \"expenseCreatedBy\": \"p_wJP6TV\",\n                   \"expenseCreatedByName\": \"user name\",\n                   \"expenseAmount\": 1000,\n                   \"expensePaidBy\": \"p_wJP6TV\",\n                   \"expenseIsCurrentVersion\": true\n               }\n           ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"no expenses found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseGetallexpenses"
  },
  {
    "type": "post",
    "url": "/expense/getAllGroupExpenses",
    "title": "get all expenses of the group",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId of which the expenses are required to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"expenses retreived successfully\",\n           \"status\": 200,\n           \"data\": [\n               {\n                   \"expenseDescription\": \"exp desc 1\",\n                   \"expenseModifiedBy\": \"\",\n                   \"expenseCreatedOn\": \"2020-01-13T17:06:14.000Z\",\n                   \"expenseModifiedOn\": null,\n                   \"expenseMembers\": [\n                       \"INKSPp4R\",\n                       \"LBoVC_eJ\",\n                       \"p_wJP6TV\"\n                   ],\n                   \"expensePreviousIds\": [],\n                   \"expenseId\": \"E5IdvTyo\",\n                   \"expenseGroup\": \"KjaxYzzo\",\n                   \"expenseTitle\": \"expense 1\",\n                   \"expenseCreatedBy\": \"p_wJP6TV\",\n                   \"expenseCreatedByName\": \"user name\",\n                   \"expenseAmount\": 1000,\n                   \"expensePaidBy\": \"p_wJP6TV\",\n                   \"expenseIsCurrentVersion\": true\n               }\n           ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"no expenses found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseGetallgroupexpenses"
  },
  {
    "type": "post",
    "url": "/expense/getExpenseDetails",
    "title": "get expense details of the selected expense",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of the expense for which the details are being requested to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"expense retreived successfully\",\n           \"status\": {\n               \"expenseDescription\": \"exp desc 1\",\n               \"expenseModifiedBy\": \"\",\n               \"expenseCreatedOn\": \"2020-01-15T11:00:30.000Z\",\n               \"expenseModifiedOn\": null,\n               \"expenseIsCurrentVersion\": true,\n               \"expenseId\": \"bqaTcuzG\",\n               \"expenseGroup\": \"dGIFkbOn\",\n               \"expenseTitle\": \"expense 1\",\n               \"expenseCreatedBy\": \"LBoVC_eJ\",\n               \"expenseCreatedByName\": \"user name\",\n               \"expenseAmount\": 1000,\n               \"expensePaidBy\": \"p_wJP6TV\",\n               \"expenseMembers\": [\n                   \"INKSPp4R\",\n                   \"LBoVC_eJ\",\n                   \"p_wJP6TV\"\n               ]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"expense not found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseGetexpensedetails"
  },
  {
    "type": "post",
    "url": "/expense/removeUsersFromExpense",
    "title": "remove users from expense",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of expense which is being updated to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the person making the request to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "removeUsers",
            "description": "<p>userIds of the users that need to be removed from the expense to be passed as a string of CSV's to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "removeUsersNames",
            "description": "<p>user names of the users that need to be removed from the expense to be passed as a string of CSV's to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"users removed from expense successfully\",\n           \"status\": 200,\n           \"data\": [\n               {\n                   \"expenseMembers\": [\n                       \"LBoVC_eJ\"\n                   ],\n                   \"removingMembers\": [\n                       \"p_wJP6TV\"\n                   ],\n                   \"newDebtAmount\": 1000\n               }\n           ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"balances not found\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseRemoveusersfromexpense"
  },
  {
    "type": "post",
    "url": "/expense/settleUserExpense",
    "title": "settle user's expense",
    "version": "1.0.0",
    "group": "expense",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expenseId",
            "description": "<p>expenseId of expense which is being updated to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>user name of the person making the request to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "payeeName",
            "description": "<p>name of the payee for the expense to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"errorOccurred\": false,\n           \"message\": \"settlement updated successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"nModified\": 1,\n               \"ok\": 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n           \"errorOccurred\": true,\n           \"message\": \"expense balance for the user not found or already settled\",\n           \"status\": 404,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/expense.js",
    "groupTitle": "expense",
    "name": "PostExpenseSettleuserexpense"
  },
  {
    "type": "post",
    "url": "/group/createNewGroup",
    "title": "create new group",
    "version": "1.0.0",
    "group": "group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>a name for the group to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupUsers",
            "description": "<p>a string of users userId/s to be passed a comma seperated string as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"group created successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"groupUsers\": [\n                    \"p_wJP6TV\",\n                    \"LBoVC_eJ\",\n                    \"12BS5-tX\"\n                ],\n                \"groupCreatedOn\": \"2020-01-09T13:09:50.000Z\",\n                \"groupName\": \"group 1\",\n                \"groupExpenses\": [],\n                \"groupSettled\": false,\n                \"groupId\": \"WlGBT1T_\",\n                \"groupOwner\": \"LBoVC_eJ\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"group name already exists\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"missing group name\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/group.js",
    "groupTitle": "group",
    "name": "PostGroupCreatenewgroup"
  },
  {
    "type": "post",
    "url": "/group/getAllGroup",
    "title": "get all groups",
    "version": "1.0.0",
    "group": "group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user requesting the groups</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"groups found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"groupUsers\": [\n                        \"p_wJP6TV\",\n                        \"LBoVC_eJ\",\n                        \"12BS5-tX\"\n                    ],\n                    \"groupCreatedOn\": \"2020-01-09T13:08:23.000Z\",\n                    \"groupName\": \"first group\",\n                    \"groupExpenses\": [],\n                    \"groupSettled\": false,\n                    \"groupId\": \"JRUhLJfP\",\n                    \"groupOwner\": \"LBoVC_eJ\"\n                },\n                ....\n                {\n                    \"groupUsers\": [\n                        \"p_wJP6TV\",\n                        \"LBoVC_eJ\",\n                        \"12BS5-tX\"\n                    ],\n                    \"groupCreatedOn\": \"2020-01-09T13:09:50.000Z\",\n                    \"groupName\": \"group 1\",\n                    \"groupExpenses\": [],\n                    \"groupSettled\": false,\n                    \"groupId\": \"WlGBT1T_\",\n                    \"groupOwner\": \"LBoVC_eJ\"\n                }\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"User's authentication details not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/group.js",
    "groupTitle": "group",
    "name": "PostGroupGetallgroup"
  },
  {
    "type": "post",
    "url": "/group/getAllGroupsOfUser",
    "title": "get all groups of user",
    "version": "1.0.0",
    "group": "group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user requesting the groups</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"groups found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"groupUsers\": [\n                        \"p_wJP6TV\",\n                        \"LBoVC_eJ\",\n                        \"12BS5-tX\"\n                    ],\n                    \"groupCreatedOn\": \"2020-01-09T13:08:23.000Z\",\n                    \"groupName\": \"first group\",\n                    \"groupExpenses\": [],\n                    \"groupSettled\": false,\n                    \"groupId\": \"JRUhLJfP\",\n                    \"groupOwner\": \"LBoVC_eJ\"\n                },\n                ....\n                {\n                    \"groupUsers\": [\n                        \"p_wJP6TV\",\n                        \"LBoVC_eJ\",\n                        \"12BS5-tX\"\n                    ],\n                    \"groupCreatedOn\": \"2020-01-09T13:09:50.000Z\",\n                    \"groupName\": \"group 1\",\n                    \"groupExpenses\": [],\n                    \"groupSettled\": false,\n                    \"groupId\": \"WlGBT1T_\",\n                    \"groupOwner\": \"LBoVC_eJ\"\n                }\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"User's authentication details not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/group.js",
    "groupTitle": "group",
    "name": "PostGroupGetallgroupsofuser"
  },
  {
    "type": "post",
    "url": "/group/getAllGroupsOfUser",
    "title": "get all groups of user",
    "version": "1.0.0",
    "group": "group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user to be added to the group should be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"user added successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"group not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/group.js",
    "groupTitle": "group",
    "name": "PostGroupGetallgroupsofuser"
  },
  {
    "type": "post",
    "url": "/group/getAllGroupsOfUser",
    "title": "get all groups of user",
    "version": "1.0.0",
    "group": "group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId of the user requesting the groups</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"group deleted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"group not found to delete\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/group.js",
    "groupTitle": "group",
    "name": "PostGroupGetallgroupsofuser"
  },
  {
    "type": "post",
    "url": "/group/getGroupDetails",
    "title": "get details of the group",
    "version": "1.0.0",
    "group": "group",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken to be passed as a body, header or query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"group details found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"groupUsers\": [\n                        \"p_wJP6TV\",\n                        \"LBoVC_eJ\",\n                        \"12BS5-tX\",\n                        \"INKSPp4R\"\n                    ],\n                    \"groupCreatedOn\": \"2020-01-09T13:09:20.000Z\",\n                    \"groupName\": \"group 2\",\n                    \"groupExpenses\": [],\n                    \"groupSettled\": false,\n                    \"groupId\": \"mceMdh5Z\",\n                    \"groupOwner\": \"LBoVC_eJ\"\n                }\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"group details not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/group.js",
    "groupTitle": "group",
    "name": "PostGroupGetgroupdetails"
  },
  {
    "type": "post",
    "url": "/users/editPassword",
    "title": "edit password",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the requestor to be passed as a body, query or header parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password of the user to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"password update successful\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"invalid password entered : please enter minimum 8 charectes which contain only characters, numeric digits, underscore\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"error verifying user's authentication details\",\n            \"status\": 500,\n            \"data\": {\n                \"name\": \"TokenExpiredError\",\n                \"message\": \"jwt expired\",\n                \"expiredAt\": \"2020-01-08T15:21:47.000Z\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersEditpassword"
  },
  {
    "type": "post",
    "url": "/users/forgotPassword",
    "title": "forgot password",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number entered during the signup to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"details verified, proceed to change password\",\n            \"status\": 200,\n            \"data\": {\n                \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjZhNTcxdHJkIiwiaWF0IjoxNTc4NDI1NTQ0OTExLCJleHAiOjE1Nzg0MjU2NjQsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InNwbGl0QmlsbHMiLCJkYXRhIjp7InVzZXJJZCI6InBfd0pQNlRWIiwiZmlyc3ROYW1lIjoiZjEiLCJsYXN0TmFtZSI6ImwxIiwiZW1haWwiOiJmMUBzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6IiA5MSAxMjM0NTY3ODkwIn19.Me3y3F7iLi2ux8U2FKrk00z_JwJwsHAqccz22DxVIE0\",\n                \"userDetails\": {\n                    \"userId\": \"p_wJP6TV\",\n                    \"firstName\": \"f1\",\n                    \"lastName\": \"l1\",\n                    \"email\": \"f1@somedomain.com\",\n                    \"mobileNumber\": \" 91 1234567890\"\n                }\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"please provide mobile number provided during signup\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersForgotpassword"
  },
  {
    "type": "post",
    "url": "/users/getAllUsers",
    "title": "get all users",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the requestor to be passed as a body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"users found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"p_wJP6TV\",\n                    \"firstName\": \"f1\",\n                    \"lastName\": \"l1\",\n                    \"email\": \"f1@somedomain.com\",\n                    \"mobileNumber\": \" 91 1234567890\",\n                    \"country\": \"India\"\n                },\n                {\n                    \"userId\": \"LBoVC_eJ\",\n                    \"firstName\": \"f3\",\n                    \"lastName\": \"l3\",\n                    \"email\": \"f3@somedomain.com\",\n                    \"country\": \"India\",\n                    \"mobileNumber\": \" 91 1234567890\"\n                },\n                {\n                    \"userId\": \"12BS5-tX\",\n                    \"firstName\": \"f4\",\n                    \"lastName\": \"l4\",\n                    \"email\": \"f4@somedomain.com\",\n                    \"country\": \"India\",\n                    \"mobileNumber\": \" 91 1234567890\"\n                }\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"User's authentication details not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersGetallusers"
  },
  {
    "type": "post",
    "url": "/users/getAllUsers",
    "title": "get all users",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the requestor to be passed as a body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"logout successful\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"User's authentication details not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersGetallusers"
  },
  {
    "type": "post",
    "url": "/users/getCountryCodes",
    "title": "country names",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "No",
            "description": "<p>input required</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"errorOccurred\": false,\n            \"message\": \"country name-code list\",\n            \"status\": 200,\n            \"data\": [\n                \"Andorra\",\n                \"United Arab Emirates\",\n                \"Afghanistan\",\n                \"Antigua and Barbuda\",\n                \"Anguilla\",\n                \"Albania\",\n                \"Armenia\",\n                ....\n                \"South Africa\",\n                \"Zambia\",\n                \"Zimbabwe\"\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersGetcountrycodes"
  },
  {
    "type": "post",
    "url": "/users/getCountryPhoneCode",
    "title": "country phone code",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "countryName",
            "description": "<p>name of the country to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"errorOccurred\": false,\n            \"message\": \"country phone code list\",\n            \"status\": 200,\n            \"data\": [\n                \"380\"\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersGetcountryphonecode"
  },
  {
    "type": "post",
    "url": "/users/getUserDetails",
    "title": "get user details",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user the details are requested for to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the requestor to be passed as body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"user details found\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"p_wJP6TV\",\n                \"firstName\": \"f1\",\n                \"lastName\": \"l1\",\n                \"email\": \"f1@somedomain.com\",\n                \"country\": \"India\",\n                \"mobileNumber\": \"+91 1234567890\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"no user found for the given details\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersGetuserdetails"
  },
  {
    "type": "post",
    "url": "/users/getUserDetails",
    "title": "get user details",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user the details are requested for to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the requestor to be passed as body, query or header parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>optional can be passed as editing property as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>optional can be passed as editing property as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>optional can be passed as editing property as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>optional can be passed as editing property as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"updated successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"no user found to update\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersGetuserdetails"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "login",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a password for the account to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"user login success\",\n            \"status\": 200,\n            \"data\": {\n                \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjVEaTYyeXFMIiwiaWF0IjoxNTc4MzQwOTUxNjU2LCJleHAiOjE1Nzg0MjczNTEsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InNwbGl0QmlsbHMiLCJkYXRhIjp7InVzZXJJZCI6InBfd0pQNlRWIiwiZmlyc3ROYW1lIjoiZjEiLCJsYXN0TmFtZSI6ImwxIiwiZW1haWwiOiJmMUBzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6Iis5MTEyMzQ1Njc4OTAifX0.CHTdUAOIU1KhngS8dIpt0GiQm15ecn2XopcdgaDsFcc\",\n                \"userDetails\": {\n                    \"userId\": \"p_wJP6TV\",\n                    \"firstName\": \"f1\",\n                    \"lastName\": \"l1\",\n                    \"email\": \"f1@somedomain.com\",\n                    \"mobileNumber\": \"+911234567890\"\n                }\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"incorrect password\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersLogin"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "signup",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>user's first name to be passes as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>user's last name to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a password for the account to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>country of the user's residence to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneCode",
            "description": "<p>country phone code of the user to be passes as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>user's mobile number for the account to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"errorOccurred\": false,\n            \"message\": \"user created successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"p_wJP6TV\",\n                \"firstName\": \"f1\",\n                \"lastName\": \"l1\",\n                \"email\": \"f1@somedomain.com\",\n                \"mobileNumber\": \"+911234567890\",\n                \"createdOn\": \"1578290453916\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"errorOccurred\": true,\n            \"message\": \"password must : be minimum 8 charectes which contain only characters, numeric digits, underscore\",\n            \"status\": 500,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/route/user.js",
    "groupTitle": "users",
    "name": "PostUsersSignup"
  }
] });
