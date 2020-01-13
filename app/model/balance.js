const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BalanceSchema = new Schema({
    balanceId: { type: String, unique: true, index: true },
    expenseId: { type: String },
    payee: { type: String },
    owedBy: { type: String },
    debtAmount: { type: Number },  //amount the person owes the payee for the expense
    expenseSettled: { type: Boolean }
})

mongoose.model('Balance', BalanceSchema)