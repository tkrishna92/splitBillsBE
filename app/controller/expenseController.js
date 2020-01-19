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
let createNewExpense = (req, res) => {

    //validate input
    let createExpense = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.groupId) || check.isEmpty(req.body.title) || check.isEmpty(req.body.description) || check.isEmpty(req.body.amount) || check.isEmpty(req.body.paidBy) || check.isEmpty(req.body.involvedMembers)) {
                logger.error("required parameters missing", "expenseController : createNewExpense - createExpense", 9);
                let apiResponse = response.generate(true, "missing required input", 400, null);
                reject(apiResponse);
            } else {
                let expenseMembers = req.body.involvedMembers.split(",");
                let newExpense = new expenseModel({
                    expenseId: shortId.generate(),
                    expenseGroup: req.body.groupId,
                    expenseTitle: req.body.title,
                    expenseDescription: req.body.description,
                    expenseCreatedBy: req.user.userId,
                    expenseCreatedByName: req.body.userName,
                    expenseCreatedOn: time.localTimeNow(),
                    expenseAmount: req.body.amount,
                    expensePaidBy: req.body.paidBy,
                    expenseMembers: expenseMembers,
                    expenseLatestModification: `${req.body.userName} created a new expense ${req.body.title}`,
                    expenseIsCurrentVersion: true
                })
                newExpense.save((err, result) => {
                    if (err) {
                        logger.error("error while saving new expense", "expenseController : createNewExpense - createExpense", 9);
                        let apiResponse = response.generate(true, "internal err : error while saving new expense", 500, err);
                        reject(apiResponse);
                    } else {
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
    let createBalance = (expenseDetails) => {
        return new Promise((resolve, reject) => {
            expenseDetails.expenseMembers.map((user) => {
                let newBalance = new BalanceModel({
                    balanceId: shortId.generate(),
                    currentExpenseId: expenseDetails.expenseId,
                    payee: expenseDetails.expensePaidBy,
                    owedBy: user,
                    debtAmount: Math.round(expenseDetails.expenseAmount / expenseDetails.expenseMembers.length),
                    expenseSettled: false
                });
                newBalance.save((err, result) => {
                    if (err) {
                        logger.error("error while creating a new balance", "expenseController : createNewExpense - createBalance", 9);
                        let apiResponse = response.generate(true, "internal err : error while creating new balance for the expense", 500, err);
                        reject(apiResponse);
                    }
                })
            })
            resolve(expenseDetails);
        })
    }

    // //add expense to the group
    // let getGroupDetails = (expenseDetails)=>{        
    //     return new Promise((resolve, reject)=>{
    //         let updateObj = [];
    //         updateObj.push(expenseDetails.expenseId);
    //         console.log(updateObj);
    //         console.log(expenseDetails.expenseGroup);
    //         groupModel.findOne({groupId : expenseDetails.expenseGroup})
    //         .lean()
    //         .exec((err, result)=>{
    //             if(err){
    //                 logger.error("error while retreiving group details", "expenseController : createNewExpense - getGroupDetails", 9);
    //                 let apiResponse = response.generate(true, "internal err : error while retreiving group details to update", 500, err);
    //                 reject(apiResponse);
    //             }else if(check.isEmpty(result)){
    //                 logger.error("group not found", "expenseController : createNewExpense - getGroupDetails", 9);
    //                 let apiResponse = response.generate(true, "group not found", 404, null);
    //                 reject(apiResponse);
    //             }else {
    //                 updateObj = result.groupExpenses;
    //                 updateObj[result.groupExpenses.length] = expenseDetails.expenseId; 
    //                 let index = updateObj.indexOf("");
    //                 if(index > -1){
    //                     updateObj.splice(index, 1);
    //                 }
    //                 groupModel.updateOne({groupId : result.groupId}, {groupExpenses : updateObj}, {multi : true}, (err, result)=>{
    //                     if(err){
    //                         logger.error("error while updating group", "expenseController : createNewExpense - getGroupDetails", 9);
    //                         let apiResponse = response.generate(true, "internal err : error while updating group", 500, err);
    //                         reject(apiResponse);
    //                     }else if(check.isEmpty(result)){
    //                         logger.error("group not found", "expenseController : createNewExpense - getGroupDetails", 9);
    //                         let apiResponse = response.generate(true, "could not find group", 404, null);
    //                         reject(apiResponse)
    //                     }else {
    //                         resolve(expenseDetails);
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // }



    createExpense()
        .then(createBalance)
        // .then(getGroupDetails)
        .then((expenseDetails) => {
            let apiResponse = response.generate(false, "expense generated successfully", 200, expenseDetails);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}

//get all expenses
let getAllExpenses = (req, res) => {
    expenseModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error("error while retreiving all the available expenses in the system", "expenseController : getAllExpenses", 9);
                let apiResponse = response.generate(true, "internal err : Error while retreiving all expenses", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("no expenses found", "expenseController : getAllExpenses", 9);
                let apiResponse = response.generate(true, "no expenses found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("expenses retreived successfully", "expenseController : getAllExpenses", 8);
                let apiResponse = response.generate(false, "expenses retreived successfully", 200, result);
                res.send(apiResponse);
            }
        })
}


//get all expenses
let getAllGroupExpenses = (req, res) => {
    let queryObj = {
        $and: [
            { expenseGroup: req.body.groupId },
            { expenseIsCurrentVersion: true }
        ]
    }
    expenseModel.find(queryObj)
        .select('-__v -_id')
        .sort('-expenseCreatedOn')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error("error while retreiving all the available expenses of the group", "expenseController : getAllGroupExpenses", 9);
                let apiResponse = response.generate(true, "internal err : Error while retreiving group expenses", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("no expenses found", "expenseController : getAllGroupExpenses", 9);
                let apiResponse = response.generate(true, "no expenses found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("expenses retreived successfully", "expenseController : getAllGroupExpenses", 8);
                let apiResponse = response.generate(false, "expenses retreived successfully", 200, result);
                res.send(apiResponse);
            }
        })
}



//get all balances 
let getAllExpenseBalance = (req, res) => {
    let queryObj = {
        $and: [
            { currentExpenseId: req.body.expenseId },
            { expenseSettled: false }
        ]
    }
    BalanceModel.find(queryObj)
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error("error while retreiving all the available balances of expense", "expenseController : getAllBalance", 9);
                let apiResponse = response.generate(true, "internal err : Error while retreiving all balances", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("no balances found", "expenseController : getAllBalance", 9);
                let apiResponse = response.generate(true, "no balances found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("balances retreived successfully", "expenseController : getAllBalance", 8);
                let apiResponse = response.generate(false, "balances retreived successfully", 200, result);
                res.send(apiResponse);
            }
        })
}

//delete Expense
let deleteExpense = (req, res) => {

    //delete all balances of expense 
    let deleteBalancesOfExpense = () => {
        return new Promise((resolve, reject) => {
            let queryObj = {
                $and: [
                    { currentExpenseId: req.body.expenseId },
                    { expenseSettled: false }
                ]
            }
            BalanceModel.deleteMany(queryObj, (err, result) => {
                if (err) {
                    logger.error("error while deleting balances of expense", "expenseController : deleteExpense - deleteBalancesOfExpense", 9);
                    let apiResponse = response.generate(true, "internal err : Error while deleting balances of the expense", 500, err);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            })
        })
    }

    //delete current expense
    let deleteCurrentExpense = (balanceResult) => {
        return new Promise((resolve, reject) => {
            expenseModel.deleteOne({ expenseId: req.body.expenseId }, (err, result) => {
                if (err) {
                    logger.error("error while deleting the expense", "expenseController : deleteExpense - deleteCurrentExpense", 9);
                    let apiResponse = response.generate(true, "internal err : error while deleting the expense", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("expense to delete not found", "expenseController : deleteExpense - deleteCurrentExpense", 9);
                    let apiResponse = response.generate(true, "expense already deleted", 404, null);
                    reject(apiResponse);
                } else {
                    result.balanceResult = balanceResult
                    resolve(result);
                }
            })
        })
    }

    deleteBalancesOfExpense()
        .then(deleteCurrentExpense)
        .then((result) => {
            let apiResponse = response.generate(false, "expense deleted successfully", 200, result);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}

//get selected expense details
let getExpenseDetails = (req, res) => {
    if (req.body.expenseId) {
        let queryObj = {
            $and: [
                { expenseId: req.body.expenseId },
                { expenseIsCurrentVersion: true }
            ]
        }
        expenseModel.findOne(queryObj)
            .select('-__v -_id')
            .lean()
            .exec((err, result) => {
                if (err) {
                    logger.error("error while retreiving expense details", "expenseController : getExpenseDetails", 9);
                    let apiResponse = response.generate(true, "internal err : Error while retreiving the expense details", 500, err);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("expense not found", "expenseController : getExpenseDetails", 9);
                    let apiResponse = response.generate(true, "expense not found", 404, null);
                    res.send(apiResponse);
                } else {
                    logger.info("expense details retreived", "expenseController : getExpenseDetails", 9);
                    let apiResponse = response.generate(false, "expense retreived successfully", 200, result);
                    res.send(apiResponse);
                }
            })
    } else {
        logger.error("expenseId missing in input", "expenseController : getExpenseDetails", 9);
        let apiResponse = response.generate(true, "please select an expense", 400, null);
        res.send(apiResponse);
    }
}

//delete all expenses of group
let deleteAllExpensesOfGroup = (req, res) => {

    //get all expenses
    let getAllExpenses = () => {
        return new Promise((resolve, reject) => {
            expenseModel.find({ expenseGroup: req.body.groupId })
                .lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error("error while retreiving expenses of the group", "expenseController : deleteAllExpensesOfGroup - getAllExpenses", 9);
                        let apiResponse = response.generate(true, "internal err : error retreiving group expenses", 500, err);
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.error("no expenses found", "expenseController : deleteAllExpensesOfGroup - getAllExpenses", 9);
                        let apiResponse = response.generate(true, "expenses not found", 404, null);
                        reject(apiResponse);
                    } else {
                        result.map((expense) => {

                            BalanceModel.deleteMany({ currentExpenseId: expense.expenseId }, (err, result) => {
                                if (err) {
                                    logger.error("error while deleting balances of expense", "expenseController : deleteAllExpensesOfGroup - getAllExpenses", 9);
                                    let apiResponse = response.generate(true, "internal err : Error while deleting balances of the expense", 500, err);
                                    reject(apiResponse);
                                } else {

                                }
                            })
                        })
                        resolve();
                    }
                })
        })
    }

    //delete all expenses
    let deleteExpenses = () => {
        return new Promise((resolve, reject) => {
            expenseModel.deleteMany({ expenseGroup: req.body.groupId }, (err, result) => {
                if (err) {
                    logger.error("error while deleting expenses", "expenseController : deleteAllExpensesOfGroup - deleteExpenses", 9);
                    let apiResponse = response.generate(true, "internal err : error deleting expenses", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("no expenses for the group found", "expenseController : deleteAllExpensesOfGroup - deleteExpenses", 9);
                    let apiResponse = response.generate(true, "expenses not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            })
        })
    }

    getAllExpenses()
        .then(deleteExpenses)
        .then((result) => {
            let apiResponse = response.generate(false, "group expenses deleted", 200, result);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}

// edit an expense payee 
let editExpensePayee = (req, res) => {

    //get expense detail
    let getExpenseDetail = () => {
        return new Promise((resolve, reject) => {
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            }
            expenseModel.findOne(queryObj)
                .select('-__v -_id')
                .lean()
                .exec((err, currentExpense) => {
                    if (err) {
                        logger.error("error while retreiving the expense for updating", "expenseController : editExpensePayee - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "internal err : Error while retreiving expense details", 500, err);
                        reject(apiResponse);
                    } if (check.isEmpty(currentExpense)) {
                        logger.error("expense not found", "expenseController : editExpensePayee - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "expense not found", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(currentExpense);
                    }
                })
        })
    }

    //update expense 
    let updateExpense = (currentExpense) => {
        return new Promise((resolve, reject) => {
            let latestModification = currentExpense.expenseLatestModification;
            latestModification.unshift(`${req.body.userName} made ${req.body.paidByUserName} as the person who paid for ${currentExpense.expenseTitle}`);
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            };
            let updateObj = {
                expenseModifiedBy: req.user.userId,
                expenseModifiedByName: req.body.userName,
                expenseModifiedOn: time.localTimeNow(),
                expensePaidBy: req.body.paidBy,
                expenseLatestModification: latestModification
            }
            expenseModel.findOneAndUpdate(queryObj, updateObj, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while updating the expense", "expenseController : editExpensePayee - updateExpense", 9);
                    let apiResponse = response.generate(true, "internal err : error while updating the expense", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("expense not found", "expenseController : editExpensePayee - updateExpense", 9);
                    let apiResponse = response.generate(true, "expense not found", 404, null);
                    reject(apiResponse);
                } else {
                    let updatedExpense = result;
                    resolve(updatedExpense);
                }
            })
        })
    }

    //update balances of the expense
    let updateBalances = (updatedExpense) => {
        return new Promise((resolve, reject) => {
            BalanceModel.updateMany({ currentExpenseId: updatedExpense.expenseId }, { payee: req.body.paidBy }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while updating the balances of the expense", "expenseController : editExpensePayee - updateBalances", 9);
                    let apiResponse = response.generate(true, "internal err : Error while updating the balances", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("balances not found", "expenseController : editExpensePayee - updateBalances", 9);
                    let apiResponse = response.generate(true, "balances not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            })
        })
    }

    getExpenseDetail()
        .then(updateExpense)
        .then(updateBalances)
        .then((resolve) => {
            let apiResponse = response.generate(false, "updated payee successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}

// edit an expense payee 
let editExpenseAmount = (req, res) => {

    //get expense detail
    let getExpenseDetail = () => {
        return new Promise((resolve, reject) => {
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            }
            expenseModel.findOne(queryObj)
                .select('-__v -_id')
                .lean()
                .exec((err, currentExpense) => {
                    if (err) {
                        logger.error("error while retreiving the expense for updating", "expenseController : editExpenseAmount - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "internal err : Error while retreiving expense details", 500, err);
                        reject(apiResponse);
                    } if (check.isEmpty(currentExpense)) {
                        logger.error("expense not found", "expenseController : editExpenseAmount - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "expense not found", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(currentExpense);
                    }
                })
        })
    }

    //update expense 
    let updateExpense = (currentExpense) => {
        return new Promise((resolve, reject) => {
            let latestModification = currentExpense.expenseLatestModification;
            latestModification.unshift(`${req.body.userName} changed the amount for ${currentExpense.expenseTitle} to ${req.body.newAmount} from ${currentExpense.expenseAmount}`);
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            };
            let updateObj = {
                expenseModifiedBy: req.user.userId,
                expenseModifiedByName: req.body.userName,
                expenseModifiedOn: time.localTimeNow(),
                expenseAmount: req.body.newAmount,
                expenseLatestModification: latestModification
            }
            expenseModel.findOneAndUpdate(queryObj, updateObj, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while updating the expense", "expenseController : editExpenseAmount - updateExpense", 9);
                    let apiResponse = response.generate(true, "internal err : error while updating the expense", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("expense not found", "expenseController : editExpenseAmount - updateExpense", 9);
                    let apiResponse = response.generate(true, "expense not found", 404, null);
                    reject(apiResponse);
                } else {
                    let updatedExpense = result;
                    resolve(updatedExpense);
                }
            })
        })
    }

    //update balances of the expense
    let updateBalances = (updatedExpense) => {
        return new Promise((resolve, reject) => {
            let newDebtAmount = Math.round(req.body.newAmount / updatedExpense.expenseMembers.length)
            BalanceModel.updateMany({ currentExpenseId: updatedExpense.expenseId }, { debtAmount: newDebtAmount }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while updating the balances of the expense", "expenseController : editExpenseAmount - updateBalances", 9);
                    let apiResponse = response.generate(true, "internal err : Error while updating the balances", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("balances not found", "expenseController : editExpenseAmount - updateBalances", 9);
                    let apiResponse = response.generate(true, "balances not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            })
        })
    }

    getExpenseDetail()
        .then(updateExpense)
        .then(updateBalances)
        .then((resolve) => {
            let apiResponse = response.generate(false, "updated amount successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}

//add users to existing expense
let addUsersToExpense = (req, res) => {

    //get expense detail
    let getExpenseDetail = () => {
        return new Promise((resolve, reject) => {
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            }
            expenseModel.findOne(queryObj)
                .select('-__v -_id')
                .lean()
                .exec((err, currentExpense) => {
                    if (err) {
                        logger.error("error while retreiving the expense for updating", "expenseController : addUsersToExpense - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "internal err : Error while retreiving expense details", 500, err);
                        reject(apiResponse);
                    } if (check.isEmpty(currentExpense)) {
                        logger.error("expense not found", "expenseController : addUsersToExpense - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "expense not found", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(currentExpense);
                    }
                })
        })
    }

    //update expense 
    let updateExpense = (currentExpense) => {
        return new Promise((resolve, reject) => {
            let newMembers = [... new Set(req.body.addedUsers.split(","))];
            let updatedMembers = currentExpense.expenseMembers.concat(newMembers);
            let uniqueMembers = [... new Set(updatedMembers)];
            let latestModification = currentExpense.expenseLatestModification;
            latestModification.unshift(`${req.body.userName} added ${req.body.addedUsersNames} to ${currentExpense.expenseTitle}`);
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            };
            let updateObj = {
                expenseModifiedBy: req.user.userId,
                expenseModifiedByName: req.body.userName,
                expenseModifiedOn: time.localTimeNow(),
                expenseMembers: uniqueMembers,
                expenseLatestModification: latestModification
            }
            expenseModel.findOneAndUpdate(queryObj, updateObj, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while updating the expense", "expenseController : addUsersToExpense - updateExpense", 9);
                    let apiResponse = response.generate(true, "internal err : error while updating the expense", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("expense not found", "expenseController : addUsersToExpense - updateExpense", 9);
                    let apiResponse = response.generate(true, "expense not found", 404, null);
                    reject(apiResponse);
                } else {
                    let updatedExpense = result.toObject();
                    updatedExpense["newMembers"] = newMembers;
                    resolve(newMembers);
                }
            })
        })
    }

    //get updated expense details
    let getUpdatedExpense = () => {
        return new Promise((resolve, reject) => {
            expenseModel.findOne({ expenseId: req.body.expenseId })
                .lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error("error while retrieving updated expense", "expenseController : addUsersToExpense - getUpdatedExpense", 9);
                        let apiResponse = response.generate(true, "internal err : Error while retreiving updated expense", 500, err);
                        reject(apiResponse)
                    } else {
                        resolve(result)
                    }
                })
        })
    }

    //update balances of the expense
    let updateBalances = (updatedExpense) => {
        return new Promise((resolve, reject) => {
            let updates = [];
            let newDebtAmount = Math.round(updatedExpense.expenseAmount / updatedExpense.expenseMembers.length)
            updatedExpense.expenseMembers.forEach(user => {
                let queryObj = {
                    $and: [
                        { currentExpenseId: updatedExpense.expenseId },
                        { owedBy: user }
                    ]
                }
                BalanceModel.findOneAndUpdate(queryObj, { debtAmount: newDebtAmount }, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("error while updating balances of the expense", "expenseController : addUsersToExpense - updateBalance-findOneAndUpdate", 9);
                        let apiResponse = response.generate(true, "internal err : error while updating balances", 500, err);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        let newBalance = new BalanceModel({
                            balanceId: shortId.generate(),
                            currentExpenseId: updatedExpense.expenseId,
                            payee: updatedExpense.expensePaidBy,
                            owedBy: user,
                            debtAmount: newDebtAmount,
                            expenseSettled: false
                        });
                        newBalance.save((err, newBalance) => {
                            if (err) {
                                logger.error("error while creating a new balance for new user", "expenseController : addUsersToExpense - updateBalance- while creating a new balance for new user", 9);
                                let apiResponse = response.generate(true, "internal err : Error while creating a new balance for new user", 500, err);
                                reject(apiResponse);
                            } else {
                                updates.push(newBalance)
                            }
                        })
                    } else {
                        updates.push(result);
                    }
                })
            });
            resolve(updatedExpense);
        })
    }

    getExpenseDetail()
        .then(updateExpense)
        .then(getUpdatedExpense)
        .then(updateBalances)
        .then((resolve) => {
            let apiResponse = response.generate(false, "updated new users successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}


//remove users from the expense
let removeUsersFromExpense = (req, res) => {

    //get expense detail
    let getExpenseDetail = () => {
        return new Promise((resolve, reject) => {
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            }
            expenseModel.findOne(queryObj)
                .select('-__v -_id')
                .lean()
                .exec((err, currentExpense) => {
                    if (err) {
                        logger.error("error while retreiving the expense for updating", "expenseController : removeUsersFromExpense - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "internal err : Error while retreiving expense details", 500, err);
                        reject(apiResponse);
                    } if (check.isEmpty(currentExpense)) {
                        logger.error("expense not found", "expenseController : removeUsersFromExpense - getExpenseDetail", 9);
                        let apiResponse = response.generate(true, "expense not found", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(currentExpense);
                    }
                })
        })
    }

    //update expense 
    let updateExpense = (currentExpense) => {
        return new Promise((resolve, reject) => {
            let latestModification = currentExpense.expenseLatestModification;
            latestModification.unshift(`${req.body.userName} removed ${req.body.removedUserNames} from ${currentExpense.expenseTitle}`);
            let newMembers = [... new Set(req.body.removeUsers.split(","))];
            newMembers.forEach((user) => {
                currentExpense.expenseMembers.splice(currentExpense.expenseMembers.indexOf(user), 1);
            })
            let updateExpenseMembers = currentExpense.expenseMembers;
            let queryObj = {
                $and: [
                    { expenseId: req.body.expenseId },
                    { expenseIsCurrentVersion: true }
                ]
            };
            let updateObj = {
                expenseModifiedBy: req.user.userId,
                expenseModifiedByName: req.body.userName,
                expenseModifiedOn: time.localTimeNow(),
                expenseMembers: updateExpenseMembers,
                expenseLatestModification: latestModification
            }
            expenseModel.findOneAndUpdate(queryObj, updateObj, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error while updating existing expense", "expenseController : removeUsersFromExpense - updateExpense", 9);
                    let apiResponse = response.generate(true, "internal err : error while updating existing expense", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("could not find expense", "expenseController : removeUsersFromExpense - updateExpense", 9);
                    let apiResponse = response.generate(true, "expense not found", 404, null);
                    reject(apiResponse);
                } else {
                    let balanceObj = [{
                        expenseMembers: updateExpenseMembers,
                        removingMembers: newMembers,
                        newDebtAmount: Math.round(currentExpense.expenseAmount / (updateExpenseMembers.length))
                    }]
                    resolve(balanceObj);
                }
            })
        })
    }

    //remove the balances of the removed users
    let removeUsersBalances = (balanceObj) => {
        return new Promise((resolve, reject) => {
            balanceObj[0].removingMembers.forEach((user) => {
                let queryObj = {
                    $and: [
                        { currentExpenseId: req.body.expenseId },
                        { owedBy: user }
                    ]
                }
                BalanceModel.deleteOne(queryObj, (err, result) => {
                    if (err) {
                        logger.error("error while deleting balance of the removed user", "expenseController : removeUsersFromExpense - removeUsersBalances", 9);
                        let apiResponse = response.generate(true, "internal err : Error while deleting balance of the removed user", 500, err);
                        reject(apiResponse);
                    } else {
                    }
                })
            })
            resolve(balanceObj);
        })
    }

    //update existing balances with updated debtAmount
    let updateUserBalances = (balanceObj) => {
        return new Promise((resolve, reject) => {
            balanceObj[0].expenseMembers.forEach((user) => {
                let queryObj = {
                    $and: [
                        { currentExpenseId: req.body.expenseId },
                        { owedBy: user }
                    ]
                }
                BalanceModel.updateOne(queryObj, { debtAmount: balanceObj[0].newDebtAmount }, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("error while updating balances", "expenseController : removeUserFromExpense - udpateUserBalances", 9);
                        let apiResponse = response.generate(true, "internal err : error while updating expense balances of existing users", 500, err);
                        reject(apiResponse);
                    } else {
                    }
                })
            })
            resolve(balanceObj);
        })
    }

    getExpenseDetail()
        .then(updateExpense)
        .then(removeUsersBalances)
        .then(updateUserBalances)
        .then((resolve) => {
            let apiResponse = response.generate(false, "users removed from expense successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}

//settle balances for expense for logged in user
let settleUserExpense = (req, res) => {

    //settle the user's balance for the expense
    let settleBalance = () => {
        return new Promise((resolve, reject) => {
            let queryObj = {
                $and: [
                    { currentExpenseId: req.body.expenseId },
                    { owedBy: req.user.userId }
                ]
            }
            BalanceModel.findOneAndRemove(queryObj, (err, result) => {
                if (err) {
                    logger.error("error finding user balance for the expense", "expenseController : settleUserExpense - settleBalance", 9);
                    let apiResponse = response.generate(true, "internal err: error finding user balance for the expense to settle", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("could not find balances for the user in this expense", "expenseController : settleUserExpense - settleBalance", 9);
                    let apiResponse = response.generate(true, "expense balance for the user not found or already settled", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result.toObject());
                }
            })
        })
    }

    // get expense details to remove the expense member and update expense history
    let updateExpense = (balanceDetails) => {
        return new Promise((resolve, reject) => {
            expenseModel.findOne({ expenseId: req.body.expenseId })
                .lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error("error while retreiving expense for updating the settlement", "expenseController : settleUserExpense - updateExpense- get expense details", 9);
                        let apiResponse = response.generate(true, "internal err : error while retreiving expense details for updating settlement", 500, err);
                        reject(apiResponse);
                    } else {
                        let latestModification = result.expenseLatestModification;
                        latestModification.unshift(`${req.body.userName} paid ${balanceDetails.debtAmount} to ${req.body.payeeName} for ${result.expenseTitle}`);
                        let existingMembers = result.expenseMembers;
                        existingMembers.splice((existingMembers.indexOf(req.user.userId)), 1)
                        let updateObj = {
                            expenseModifiedBy: req.user.userId,
                            expenseModifiedByName: req.body.userName,
                            expenseModifiedOn: time.localTimeNow(),
                            expenseMembers: existingMembers,
                            expenseLatestModification: latestModification
                        }
                        expenseModel.updateOne({ expenseId: req.body.expenseId }, updateObj, { multi: true }, (err, result) => {
                            if (err) {
                                logger.error("error updating the expense", "expenseController : settleUserExpense - updateExpense - updating expense", 9);
                                let apiResponse = response.generate(true, "internal err : error while updating the expense", 500, err);
                                reject(apiResponse);
                            } else {
                                resolve(result);
                            }
                        })
                    }
                })
        })
    }

    settleBalance()
        .then(updateExpense)
        .then((resolve) => {
            let apiResponse = response.generate(false, "settlement updated successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })


}

module.exports = {
    createNewExpense: createNewExpense,
    getAllExpenses: getAllExpenses,
    getAllGroupExpenses: getAllGroupExpenses,
    getAllExpenseBalance: getAllExpenseBalance,
    deleteExpense: deleteExpense,
    deleteAllExpensesOfGroup: deleteAllExpensesOfGroup,
    getExpenseDetails: getExpenseDetails,
    editExpensePayee: editExpensePayee,
    editExpenseAmount: editExpenseAmount,
    addUsersToExpense: addUsersToExpense,
    removeUsersFromExpense: removeUsersFromExpense,
    settleUserExpense: settleUserExpense
}