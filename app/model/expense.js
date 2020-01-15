const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let expenseSchema = new Schema({
    expenseId: { type: String, index: true, unique: true },
    expenseGroup : {type : String},
    expenseTitle : {type : String},
    expenseDescription: { type: String, default: '' },
    expenseCreatedBy: { type: String },
    expenseModifiedBy: { type: String, default : '' },
    expenseCreatedOn: { type: Date, default: Date.now() },
    expenseModifiedOn: { type: Date, default : '' },
    expenseAmount: { type: Number },
    expensePaidBy: { type: String },
    expenseMembers: { type: [], default : undefined },
    expensePreviousIds: { type : String},
    expenseIsCurrentVersion: { type: Boolean, default : true}
})

mongoose.model('Expense', expenseSchema);