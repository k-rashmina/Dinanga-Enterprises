const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    availability: {
      type: Boolean,
      default: true
    },
    department: {
      type: String,
      enum: ['Mechanical', 'Consultancy'],
      required: true
    },
    role: {
        type: String,
        enum: ['admin', 'Mechanical', 'Consultancy'],
        required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;