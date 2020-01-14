const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GroupSchema = new Schema({
    groupId: { type: String, index: true, unique: true },
    groupOwner: { type: String },
    groupUsers: { type: [] },
    groupCreatedOn: { type: Date, default: Date.now() },
    groupName: { type: String, default: '' },
    groupExpenses: { type: [], default: '' },
    groupSettled: { type: Boolean, default: false }
})

mongoose.model('Group', GroupSchema);