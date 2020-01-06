define({ "api": [
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
            "description": "<p>country of the user's residence</p>"
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
