var mongoose = require('mongoose');

var Author = new mongoose.Schema({
  name: { type: String, maxLength: 60, required: true },
  living: { type: Boolean },
  age: { type: Number, min: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Author', Author);
