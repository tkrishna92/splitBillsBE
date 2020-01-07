const express = require('express');
const controller = require('./../controller/userController');
const appConfig = require('./../../config/appConfig');
const auth = require('./../middleware/auth');

let setRouter = (app) =>{
    let baseUrl = `${appConfig.apiVersion}/users`

    //signup
    //params : firstName, lastName, email, password, MobileNumber
    app.post(`${baseUrl}/signup`, controller.signup)

    /**
     * @api {post} /users/signup signup
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} firstName user's first name to be passes as body parameter
     * @apiParam {String} lastName user's last name to be passed as body parameter
     * @apiParam {String} email user's email to be passed as body parameter
     * @apiParam {String} password a password for the account to be passed as body parameter
     * @apiParam {String} country country of the user's residence to be passed as a body parameter
     * @apiParam {String} phoneCode country phone code of the user to be passes as a body parameter
     * @apiParam {String} mobileNumber user's mobile number for the account to be passed as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "user created successfully",
            "status": 200,
            "data": {
                "userId": "p_wJP6TV",
                "firstName": "f1",
                "lastName": "l1",
                "email": "f1@somedomain.com",
                "mobileNumber": "+911234567890",
                "createdOn": "1578290453916"
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "password must : be minimum 8 charectes which contain only characters, numeric digits, underscore",
            "status": 500,
            "data": null
        }
     * 
     */

    // to get the country codes to be used again to get the country phone code
    // no input required, it gives the list of country codes without any input
    app.get(`${baseUrl}/getCountryCodes`, controller.getCountryCode);
    /**
     * @api {post} /users/getCountryCodes country names
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} No input required 
     * 
     * @apiSuccessExample {json} Success-Response:
     * 
     * {
            "errorOccurred": false,
            "message": "country name-code list",
            "status": 200,
            "data": [
                "Andorra",
                "United Arab Emirates",
                "Afghanistan",
                "Antigua and Barbuda",
                "Anguilla",
                "Albania",
                "Armenia",
                ....
                "South Africa",
                "Zambia",
                "Zimbabwe"
            ]
        }
     * 
     */

     // to get the country phone code
    // country name required as input parameter
    app.post(`${baseUrl}/getCountryPhoneCode`, controller.getCountryPhoneCode);
    /**
     * @api {post} /users/getCountryPhoneCode country phone code
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} countryName name of the country to be passed as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * 
     * {
            "errorOccurred": false,
            "message": "country phone code list",
            "status": 200,
            "data": [
                "380"
            ]
        }
     * 
     */

    //login
    //params : email, password
    app.post(`${baseUrl}/login`, controller.login)

    /**
     * @api {post} /users/login login
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} email user's email to be passed as body parameter
     * @apiParam {String} password a password for the account to be passed as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "user login success",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjVEaTYyeXFMIiwiaWF0IjoxNTc4MzQwOTUxNjU2LCJleHAiOjE1Nzg0MjczNTEsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InNwbGl0QmlsbHMiLCJkYXRhIjp7InVzZXJJZCI6InBfd0pQNlRWIiwiZmlyc3ROYW1lIjoiZjEiLCJsYXN0TmFtZSI6ImwxIiwiZW1haWwiOiJmMUBzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6Iis5MTEyMzQ1Njc4OTAifX0.CHTdUAOIU1KhngS8dIpt0GiQm15ecn2XopcdgaDsFcc",
                "userDetails": {
                    "userId": "p_wJP6TV",
                    "firstName": "f1",
                    "lastName": "l1",
                    "email": "f1@somedomain.com",
                    "mobileNumber": "+911234567890"
                }
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "incorrect password",
            "status": 400,
            "data": null
        }
     * 
     */


    //get single user details
    //params : userId to be passed as body parameter,
    //params : authToken to be passed as body, query or header parameter 
    app.post(`${baseUrl}/getUserDetails`, auth.isAuthenticated, controller.getUserDetails)

    /**
     * @api {post} /users/getUserDetails get user details
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user the details are requested for to be passed as body parameter
     * @apiParam {String} authToken authToken of the requestor to be passed as body, query or header parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "user details found",
            "status": 200,
            "data": {
                "userId": "p_wJP6TV",
                "firstName": "f1",
                "lastName": "l1",
                "email": "f1@somedomain.com",
                "country": "India",
                "mobileNumber": "+91 1234567890"
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "no user found for the given details",
            "status": 404,
            "data": null
        }
     * 
     */

    //get single user details
    //params : authToken to be passed as body, query or header parameter 
    //params : optional - firstName, lastName, email, mobileNumber, country can be passed as body parameters
    //params : userId to be passed as body parameter
    app.post(`${baseUrl}/editUser`, auth.isAuthenticated, controller.editUser)

    /**
     * @api {post} /users/getUserDetails get user details
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user the details are requested for to be passed as body parameter
     * @apiParam {String} authToken authToken of the requestor to be passed as body, query or header parameter
     * @apiParam {String} firstName optional can be passed as editing property as body parameter
     * @apiParam {String} lastName optional can be passed as editing property as body parameter
     * @apiParam {String} mobileNumber optional can be passed as editing property as body parameter
     * @apiParam {String} email optional can be passed as editing property as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "updated successfully",
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
            "message": "no user found to update",
            "status": 404,
            "data": null
        }
     * 
     */

    //forgotPassword : this checks if the given email and mobile number belongs to the same account 
    // and creates a two minute token for the front end to use in a link to edit password
    //params : email, mobileNumber
    app.post(`${baseUrl}/forgotPassword`, controller.forgotPassword)

    /**
     * @api {post} /users/forgotPassword forgot password
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} email user's email to be passed as body parameter
     * @apiParam {String} mobileNumber mobile number entered during the signup to be passed as body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
            "errorOccurred": false,
            "message": "details verified, proceed to change password",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjZhNTcxdHJkIiwiaWF0IjoxNTc4NDI1NTQ0OTExLCJleHAiOjE1Nzg0MjU2NjQsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InNwbGl0QmlsbHMiLCJkYXRhIjp7InVzZXJJZCI6InBfd0pQNlRWIiwiZmlyc3ROYW1lIjoiZjEiLCJsYXN0TmFtZSI6ImwxIiwiZW1haWwiOiJmMUBzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6IiA5MSAxMjM0NTY3ODkwIn19.Me3y3F7iLi2ux8U2FKrk00z_JwJwsHAqccz22DxVIE0",
                "userDetails": {
                    "userId": "p_wJP6TV",
                    "firstName": "f1",
                    "lastName": "l1",
                    "email": "f1@somedomain.com",
                    "mobileNumber": " 91 1234567890"
                }
            }
        }
     * 
     * @apiErrorExample {json} Error-Response:
     * {
            "errorOccurred": true,
            "message": "please provide mobile number provided during signup",
            "status": 400,
            "data": null
        }
     * 
     */



}


module.exports = {
    setRouter : setRouter
}