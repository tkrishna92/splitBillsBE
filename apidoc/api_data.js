define({ "api": [
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
