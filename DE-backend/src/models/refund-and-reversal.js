const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refundAndReversalSchema = new Schema({
    transact_type: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        default: 'refund or reversal transaction'
    },
    transaction: {
        type: Object,
        required: true
    }
})



const refundAndReversal = mongoose.model('refund_and_reversal', refundAndReversalSchema);
module.exports = refundAndReversal;