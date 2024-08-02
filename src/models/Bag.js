const mongoose = require('mongoose');

const BagSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  price: { type: Number },
  discount: { type: Number, default: 0 },
  amount: { type: Number, default: 1 },
}, { versionKey: false });

const Bag = mongoose.model('bag', BagSchema);

module.exports = Bag;
