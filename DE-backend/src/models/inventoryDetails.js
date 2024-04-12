const mongoose = require("mongoose");
const schema = mongoose.Schema;

const inventoryDetailsSchema = new schema({
  itemNumber: {
    type: String,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
    required: true,
    // unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reorderLevel: {
    type: Number,
    required: true,
  },
  reorderState: {
    type: String,
    enum: ["Out of Stocks", "Low Stocks", "In Stocks"],
    required: true,
  },
  itemPrice:{
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

inventoryDetailsSchema.methods.updateReorderState = function () {
  if (this.quantity == 0) {
    this.reorderState = "Out of Stocks";
  } else if (this.quantity <= this.reorderLevel) {
    this.reorderState = "Low Stocks";
  } else {
    this.reorderState = "In Stocks";
  }
};

const inventoryDetails = mongoose.model(
  "inventoryDetails",
  inventoryDetailsSchema
);
module.exports = inventoryDetails;
