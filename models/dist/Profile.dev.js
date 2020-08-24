"use strict";

var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // connecting to id in the user model (i.e. _id)
    ref: 'user'
  },
  favActress: {
    type: String
  },
  favActor: {
    type: String
  },
  favMovies: {
    type: [String],
    required: true
  },
  favTvShows: {
    type: [String],
    required: true
  },
  youtube: {
    type: String
  },
  animes: {
    type: [String]
  },
  latestMoviesSeen: [{
    title: {
      type: String,
      required: true
    },
    director: {
      type: String
    },
    plot: {
      type: String
    }
  }],
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('profile', ProfileSchema);