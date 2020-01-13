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
const expenseModel = mongoose.model('Expense');
const BalanceModel = mongoose.model('Balance');

//create a new expense 
let createNewExpense = (req, res)=>{

    //validate input
    let createExpense = ()=>{
        return new Promise((resolve, reject)=>{
            if(check.isEmpty(req.body.groupId) || check.isEmpty(req.body.title) || check.isEmpty(req.body.description) || check.isEmpty(req.body.amount) || check.isEmpty(req.body.paidBy) || check.isEmpty(req.body.involvedMembers)){
                logger.error("required parameters missing", "expenseController : createNewExpense - createExpense", 9);
                let apiResponse = response.generate(true, "missing required input", 400, null);
                reject(apiResponse);
            }else{
                let expenseMembers = req.body.involvedMembers.split(",");
                let newExpense = new expenseModel({
                    expenseId : shortId.generate(),
                    expenseGroup : req.body.groupId,
                    expenseTitle : req.body.title,
                    expenseDescription : req.body.description,
                    expenseCreatedBy : req.user.userId,
                    expenseCreatedOn : time.localTimeNow(),
                    expenseAmount : req.body.amount,
                    expensePaidBy : req.body.paidBy,
                    expenseMembers : expenseMembers,
                    expenseIsCurrentVersion : true
                })
                newExpense.save((err, result)=>{
                    if(err){
                        logger.error("error while saving new expense", "expenseController : createNewExpense - createExpense", 9);
                        let apiResponse = response.generate(true, "internal err : error while saving new expense", 500, err);
                        reject(apiResponse);
                    }else{
                        let expenseDetails = result.toObject();
                        delete expenseDetails.__v;
                        delete expenseDetails._id;
                        resolve(expenseDetails);
                    }
                })
            }
        })
    }

    //create a new balance for each members involved
    let createBalance = (expenseDetails)=>{        
        return new Promise((resolve, reject)=>{
            expenseDetails.expenseMembers.map((user)=>{
                let newBalance = new BalanceModel({
                    balanceId : shortId.generate(),
                    expenseId : expenseDetails.expenseId,
                    payee : expenseDetails.expensePaidBy,
                    owedBy : user,
                    debtAmount : Math.round(expenseDetails.expenseAmount/expenseDetails.expenseMembers.length),
                    expenseSettled : false
                });
                newBalance.save((err, result)=>{
                    if(err){
                        logger.error("error while creating a new balance", "expenseController : createNewExpense - createBalance", 9);
                        let apiResponse = response.generate(true, "internal err : error while creating new balance for the expense", 500, err);
                        reject(apiResponse);
                    }
                })
            })
            resolve(expenseDetails);            
        })
    }

    createExpense()
    .then(createBalance)
    .then((expenseDetails)=>{
        let apiResponse = response.generate(false, "expense generated successfully", 200, expenseDetails);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })
}

//get all expenses
let getAllExpenses = (req, res)=>{
    expenseModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result)=>{
        if(err){
            logger.error("error while retreiving all the available expenses in the system", "expenseController : getAllExpenses",9);
            let apiResponse = response.generate(true, "internal err : Error while retreiving all expenses", 500, err);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error("no expenses found", "expenseController : getAllExpenses", 9);
            let apiResponse = response.generate(true, "no expenses found", 404, null);
            res.send(apiResponse);
        }else {
            logger.info("expenses retreived successfully", "expenseController : getAllExpenses", 8);
            let apiResponse = response.generate(false, "expenses retreived successfully", 200, result);
            res.send(apiResponse);
        }
    })
}


//get all balances 
let getAllExpenseBalance = (req, res)=>{
    BalanceModel.find({expenseId : req.body.expenseId})
    .select('-__v -_id')
    .lean()
    .exec((err, result)=>{
        if(err){
            logger.error("error while retreiving all the available balances of expense", "expenseController : getAllBalance",9);
            let apiResponse = response.generate(true, "internal err : Error while retreiving all balances", 500, err);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error("no balances found", "expenseController : getAllBalance", 9);
            let apiResponse = response.generate(true, "no balances found", 404, null);
            res.send(apiResponse);
        }else {
            logger.info("balances retreived successfully", "expenseController : getAllBalance", 8);
            let apiResponse = response.generate(false, "balances retreived successfully", 200, result);
            res.send(apiResponse);
        }
    })
}

//get all expenses
let getAllGroupExpenses = (req, res)=>{
    expenseModel.find({expenseGroup : req.body.groupId})
    .select('-__v -_id')
    .lean()
    .exec((err, result)=>{
        if(err){
            logger.error("error while retreiving all the available expenses of the group", "expenseController : getAllGroupExpenses",9);
            let apiResponse = response.generate(true, "internal err : Error while retreiving group expenses", 500, err);
            res.send(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error("no expenses found", "expenseController : getAllGroupExpenses", 9);
            let apiResponse = response.generate(true, "no expenses found", 404, null);
            res.send(apiResponse);
        }else {
            logger.info("expenses retreived successfully", "expenseController : getAllGroupExpenses", 8);
            let apiResponse = response.generate(false, "expenses retreived successfully", 200, result);
            res.send(apiResponse);
        }
    })
}

//delete Expense
let deleteExpense = (req, res)=>{
    
    //delete all balances of expense 
    let deleteBalancesOfExpense = ()=>{
        return new Promise((resolve, reject)=>{
            BalanceModel.deleteMany({expenseId : req.body.expenseId}, (err, result)=>{
                if(err){
                    logger.error("error while deleting balances of expense", "expenseController : deleteExpense - deleteBalancesOfExpense", 9);
                    let apiResponse = response.generate(true, "internal err : Error while deleting balances of the expense", 500, err);
                    reject(apiResponse);
                }else{
                    resolve();
                }
            })
        })
    }

    //delete current expense
    let deleteCurrentExpense = ()=>{
        return new Promise((resolve, reject)=>{
            expenseModel.deleteOne({expenseId : req.body.expenseId}, (err, result)=>{
                if(err){
                    logger.error("error while deleting the expense", "expenseController : deleteExpense - deleteCurrentExpense", 9);
                    let apiResponse = response.generate(true, "internal err : error while deleting the expense", 500, err);
                    reject(apiResponse);
                }else if(result.n == 0){
                    logger.error("expense to delete not found", "expenseController : deleteExpense - deleteCurrentExpense", 9);
                    let apiResponse = response.generate(true, "expense already deleted", 404, null);
                    reject(apiResponse);
                }else {
                    resolve(result);
                }
            })
        })
    }

    deleteBalancesOfExpense()
    .then(deleteCurrentExpense)
    .then((result)=>{
        let apiResponse = response.generate(false, "expense deleted successfully", 200, result);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })
}

//edit expenses 

module.exports = {
    createNewExpense : createNewExpense,
    getAllExpenses : getAllExpenses,
    getAllGroupExpenses : getAllGroupExpenses,
    getAllExpenseBalance : getAllExpenseBalance,
    deleteExpense : deleteExpense
}