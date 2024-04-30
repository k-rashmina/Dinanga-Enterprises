const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobTrasactionSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'success', 'fail'],
    required: true,
  },
  amount: {
    job_amt: {
      type: Number,
      required: true
    },
    tax_amt: {
      type: Number,
      required: true
    },
    tot_amount: {
      type: Number,
      
    }
  },
  ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    refPath: 'model_type',
    required: true
  },
  desc: {
    type: String,
    default: 'Sales Transaction',
  },
  transact_type: {
    type: String,
    enum: ['online', 'offline']
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
  },
  pay_date: {
    type: Date,
  },
  pay_type: {
    type: String,
    enum: ['transfer', 'cash'],
    default: 'cash'
  },
  pay_rcpt: {
    type: String
  },
  model_type: {
    type: String,
    enum: ['jobAppointment', 'services'],
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