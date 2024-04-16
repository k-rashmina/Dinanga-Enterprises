const createInventoryItem = require("./create");
const getAllItems = require("./read");
const updateInventoryItem = require("./update");
const deleteInventoryItem = require("./delete");
const consumeInventoryItem = require("./consume");
const searchInventoryItem = require("./search");

module.exports = {
  createInventoryItem,
  getAllItems,
  updateInventoryItem,
  deleteInventoryItem,
  searchInventoryItem,
  consumeInventoryItem,
};
