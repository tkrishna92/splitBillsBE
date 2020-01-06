//modules
const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');
const countryList = require('country-list');
const countryTelephoneCode = require('country-telephone-code');

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

//new user signup function
let signup = (req,res)=>{

    //checking if the user email and mobile number already exists
    let validateInput = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.email && req.body.mobileNumber){
                if(!validateInputParams.Email(req.body.email)){
                    logger.error("invalid email Id", "userController : signup - validateInput", 9);
                    let apiResponse = response.generate(true, "invalid email id provided", 500, null);
                    reject(apiResponse);
                }else if(!validateInputParams.Password(req.body.password)){
                    logger.error("entered password does not meet requirements","userController : signup - validateInput", 9);
                    let apiResponse = response.generate(true, "password must : be minimum 8 charectes which contain only characters, numeric digits, underscore", 400, null);
                    reject(apiResponse);
                }else{                    
                    resolve();
                }
            }else{
                logger.error("required input missing", "userController : signup - validateInput", 9);
                let apiResponse = response.generate(true, "required input missing : check email or mobileNumber", 404, null);
                reject(apiResponse);
            }
        })
    }

    // creating user
    let createUser = ()=>{
        return new Promise((resolve, reject)=>{
            userModel.find({email : req.body.email}, (err, result)=>{
                if(err){
                    logger.err("error searching for existing user with given email", "userController : signup - createUser", 9);
                    let apiResponse = response.generate(true, "internal db error : error searching for existing user with given email", 500, err);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    let newUser = new userModel({
                        userId : shortId.generate(),
                        password : generatePassword.generatePassword(req.body.password),
                        firstName : req.body.firstName,
                        lastName : req.body.lastName || '',
                        email : req.body.email,
                        country : req.body.country,
                        phoneCode : req.body.phoneCode,
                        mobileNumber : req.body.mobileNumber,
                        createdOn : Date.now()
                    })
                    newUser.save((err, result)=>{
                        if(err){
                            logger.error("internal db error : error saving new user", "userController : signup - createUser", 9);
                            let apiResponse = response.generate(true, "internal db error: error saving new user", 500, err);
                            reject(apiResponse);
                        }else {
                            let userDetails = result.toObject();
                            delete userDetails.password;
                            delete userDetails.__v;
                            delete userDetails._id;
                            resolve(userDetails)
                        }
                    })
                }else{
                    logger.error("given email id already exists for an active account", "userController : signup - createUser",9);
                    let apiResponse = response.generate(true, "given email id already exists for an active account", 400, null);
                    reject(apiResponse);
                }
            })
        })
    }


    validateInput()
        .then(createUser)
        .then((userDetails)=>{
            logger.info("saved new user successfully", "userController : signup - createUser", 8);
            let apiResponse = response.generate(false, "user created successfully", 200, userDetails);
            res.send(apiResponse);
        })
        .catch((error)=>{
            res.send(error)
        })
}

//login function
let login = (req, res)=>{

    //validating user input email
    let validateInput = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.email){
                userModel.findOne({email : req.body.email}, (err, result)=>{
                    if(err){
                        logger.error("error retreiving user details", "userController : login - validateInput",9);
                        let apiResponse = response.generate(true, "internal err : error retreiving user details", 500, err);
                        reject(apiResponse);
                    }else if(check.isEmpty(result)){
                        logger.error("no user account with given details exists", "userController : login - validateInput", 9);
                        let apiResponse = response.generate(true, "no user exists for given email", 404, null);
                        reject(apiResponse);
                    }else {
                        let userDetails = result.toObject();
                        resolve(userDetails);
                    }
                })
            }else{
                logger.error("email of the user not provided", "userController : login - validateInput", 9);
                let apiResponse = response.generate(true, "email not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // compare given password with existing password
    let checkPassword = (userDetails)=>{
        return new Promise((resolve, reject)=>{
            if(req.body.password){
                generatePassword.comparePassword(req.body.password, userDetails.password, (err, isMatch)=>{
                    if(err){
                        logger.error("error comparing given password and actual password", "userController : login - checkPassword", 9);
                        let apiResponse = response.generate(true, "internal error : error while verifying password", 500, err);
                        reject(apiResponse);
                    }else if(isMatch){
                        delete userDetails.password;
                        delete userDetails.__v;
                        delete userDetails._id;
                        delete userDetails.createdOn;
                        delete userDetails.country;
                        resolve(userDetails);
                    }else{
                        logger.error("incorrect password", "userController : login - checkPassword", 9);
                        let apiResponse = response.generate(true, "incorrect password", 400, null);
                        reject(apiResponse);
                    }
                })
            }else{
                logger.error("password not provided", "userController : login - checkPassword", 9);
                let apiResponse = response.generate(true, "password not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    //generate token data from user details
    let generateToken = (userDetails)=>{
        return new Promise((resolve, reject)=>{
            token.generateToken(userDetails, (err, tokenDetails)=>{
                if(err){
                    logger.error("error generating new token", "userController : login - generate token", 9);
                    let apiResponse = response.generate(true, "internal error : error while generating a new token", 500, err);
                    reject(apiResponse);
                }else {
                    
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails);
                }
            })
        })
    }

    //save generated token and send the user details with token details to the user that logged in
    let saveTokenDetails = (tokenDetails)=>{
        return new Promise((resolve, reject)=>{
            authModel.findOne({userId : tokenDetails.userId}, (err, existingTokenDetails)=>{
                if(err){
                    logger.error("error while finding existing token to save new token details", "userController : login - saveTokenDetails", 9);
                    let apiResponse = response.generate(true, "internal err : error while retreiving existing token details", 500, err);
                    reject(apiResponse);
                }else if(check.isEmpty(existingTokenDetails)){
                    let newTokenDetails = new authModel({
                        userId : tokenDetails.userId,
                        authToken : tokenDetails.token,
                        tokenSecret : tokenDetails.tokenSecret,
                        tokenGenerationTime : time.localTimeNow()
                    })
                    newTokenDetails.save((err, result)=>{
                        if(err){
                            logger.error("error while saving new token details", "userController : login - saveTokenDetials", 9);
                            let apiResponse = response.generate(true, "internal err : error while saving new token details", 500, err);
                            reject(apiResponse);
                        }else{
                            let details = {
                                authToken : result.authToken,
                                userDetails : tokenDetails.userDetails
                            }
                            resolve(details);
                        }
                    })
                }else{
                    existingTokenDetails.authToken = tokenDetails.token;
                    existingTokenDetails.tokenSecret = tokenDetails.tokenSecret;
                    existingTokenDetails.tokenGenerationTime = time.localTimeNow();
                    existingTokenDetails.save((err, result)=>{
                        if(err){
                            logger.error("error while updating existing token details", "userController : login - saveTokenDetails", 9);
                            let apiResponse = response.generate(true, "internal err : error updating existing token details", 500, err);
                            reject(apiResponse);
                        }else{
                            let details = {
                                authToken : result.authToken,
                                userDetails : tokenDetails.userDetails
                            }
                            resolve(details);
                        }
                    })
                }
            })
        })
    }

    validateInput()
        .then(checkPassword)
        .then(generateToken)
        .then(saveTokenDetails)
        .then((details)=>{
            logger.info("new token saved successfully", "userController : login", 9);
            let apiResponse = response.generate(false, "user login success", 200, details);
            res.send(apiResponse);
        })
        .catch((error)=>{
            res.send(error);
        })
}

let getCountryCode = (req, res)=>{
    let apiResponse = response.generate(false, "country name-code list", 200, (countryList.getNames()));
    res.send(apiResponse);    
}

let getCountryPhoneCode = (req, res)=>{
    logger.info("country phone code requested", "userController : getCountryPhoneCode", 8);
    let countryCode = countryList.getCode(req.body.countryName);
    console.log(countryTelephoneCode(countryCode));
    let apiResponse = response.generate(false, "country phone code list", 200, (countryTelephoneCode(countryCode)));
    res.send(apiResponse);
}


module.exports = {
    signup : signup,
    getCountryCode : getCountryCode,
    getCountryPhoneCode : getCountryPhoneCode,
    login : login
}