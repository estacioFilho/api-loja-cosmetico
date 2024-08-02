const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  price: { type: Number },
  discount: { type: Number, default: 0 },
  description: { type: mongoose.Schema.Types.String, required: true },
}, { versionKey: false });

const favorite = mongoose.model('favorite', favoriteSchema);

module.exports = favorite;
