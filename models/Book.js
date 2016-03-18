var mongoose = require('mongoose');

var Book = new mongoose.Schema({
  title: { type: String, maxLength: 60, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: 'Author' },
  rating: { type: Number, min: 1, max: 10 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', Book);
