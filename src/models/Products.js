const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  images: [{ type: mongoose.Schema.Types.String, required: true }],
  category: { type: mongoose.Schema.Types.String, required: true },
  name: { type: mongoose.Schema.Types.String, required: true },
  review: { type: mongoose.Schema.Types.Number, default: 5 },
  price: { type: mongoose.Schema.Types.Number, required: true },
  discount: { type: mongoose.Schema.Types.Number, default: 0 },
  description: { type: mongoose.Schema.Types.String, required: true },
  stock: { type: mongoose.Schema.Types.Number, default: 0 },
}, { versionKey: false });

const product = mongoose.model('products', productSchema);

module.exports = product;
