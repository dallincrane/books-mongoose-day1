var Author = require('../models/Author');
var mongoose = require('mongoose');

module.exports = {
  create: function(req, res, next) {
    Author.create(req.body, function(err, result) {
      if (err) return next(err);
      res.status(200).json(result);
    });
  },

  index: function(req, res, next) {
    Author
      .find(req.query)
      .sort({ title: 1 })
      .exec(function(err, result) {
        if (err) return next(err);
        res.status(200).json(result);
      });
  },

  show: function(req, res, next) {
    Author
      .findById(req.params.id)
      .exec(function(err, result) {
        if (err) return next(err);
        res.status(200).json(result);
      });
  },

  update: function(req, res, next) {
    Author.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      req.body,
      { new: true },
      function(err, result) {
        if (err) return next(err);
        res.status(200).json(result);
      }
    );
  },

  destroy: function(req, res, next) {
    Author.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return next(err);
      res.status(204).send();
    });
  }
};
