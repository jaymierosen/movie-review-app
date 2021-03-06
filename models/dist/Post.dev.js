"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId
    }
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      "default": Date.now
    }
  }],
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('post', PostSchema);