const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchTrasactionSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  order_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'order'
  },
  desc: {
    type: String,
    default: 'Purchase Transaction',
  },
  create_date: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  update_date: {
    type: Date,
    default: () => Date.now()
  },
  transact_no: {
    type: String,
    required: true
  }
})

purchTrasactionSchema.query.fromdate = function(from) {

  return this.where('create_date').gt(from);

}

purchTrasactionSchema.query.todate = function(to) {

    return this.where('create_date').lt(to);
  
}

purchTrasactionSchema.query.byjob = function(job) {

    return this.where('job_id').equals(job);

}

purchTrasactionSchema.query.bystatus = function(st) {

    return this.where('status').equals(st)

}

const purchTrasaction = mongoose.model('purchase_transaction', purchTrasactionSchema);
module.exports = purchTrasaction;