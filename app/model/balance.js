const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BalanceSchema = new Schema({
    balanceId: { type: String, unique: true, index: true },
    currentExpenseId: { type: String },
    previousExpenseId: { type: String },
    payee: { type: String },
    owedBy: { type: String },
    debtAmount: { type: Number },  //amount the person owes the payee for the expense
    balanceIsCurrent: { type: Boolean, default: true },
    expenseSettled: { type: Boolean, default: false }
})

mongoose.model('Balance', BalanceSchema)