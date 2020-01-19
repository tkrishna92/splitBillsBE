const mongoose = require('mongoose');
const schema = mongoose.Schema;
const time = require('./../libs/timeLib')

const Auth = new schema({
    userId: {
        type: String
    },
    authToken: {
        type: String
    },
    tokenSecret: {
        type: String
    },
    tokenGenerationTime: {
        type: Date,
        default: time.timeNow()
    }
})

mongoose.model('Auth', Auth);