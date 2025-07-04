const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId : String,
  name: String,
  price: Number,
  time: Date,
});

module.exports = mongoose.model("Purchase", purchaseSchema);
