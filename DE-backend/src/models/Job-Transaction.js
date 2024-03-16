const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobTrasactionSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  job_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'job'
  },
  desc: {
    type: String,
    default: 'Sales Transaction',
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
    type: Number,
    required: true
  }
})

jobTrasactionSchema.query.fromdate = function(from) {

  return this.where('create_date').gt(from);

}

jobTrasactionSchema.query.todate = function(to) {

    return this.where('create_date').lt(to);
  
}

jobTrasactionSchema.query.byjob = function(job) {

    return this.where('job_id').equals(job);

}

jobTrasactionSchema.query.bystatus = function(st) {

    return this.where('status').equals(st)

}

const jobTransaction = mongoose.model('job_transaction', jobTrasactionSchema);
module.exports = jobTransaction;