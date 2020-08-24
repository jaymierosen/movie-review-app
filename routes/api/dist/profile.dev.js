"use strict";

var express = require('express'); // const axios = require('axios');


var config = require('config');

var router = express.Router();

var auth = require('../../middleware/auth');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult; // bring in normalize to give us a proper url, regardless of what user entered


var normalize = require('normalize-url');

var checkObjectId = require('../../middleware/checkObjectId');

var Profile = require('../../models/Profile');

var User = require('../../models/User');

var Post = require('../../models/Post'); // @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private


router.get('/me', auth, function _callee(req, res) {
  var profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }).populate('user', ['name', 'avatar']));

        case 3:
          profile = _context.sent;

          if (profile) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'There is no profile for this user'
          }));

        case 6:
          res.json(profile);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post('/', [auth, [check('favMovies', 'Your favourite movies are required').not().isEmpty(), check('favTvShows', 'Your favourite TV Shows are required').not().isEmpty()]], function _callee2(req, res) {
  var errors, _req$body, favActress, favActor, favTvShows, favMovies, youtube, profileFields, profile;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, favActress = _req$body.favActress, favActor = _req$body.favActor, favTvShows = _req$body.favTvShows, favMovies = _req$body.favMovies, youtube = _req$body.youtube;
          profileFields = {
            user: req.user.id,
            favMovies: Array.isArray(favMovies) ? favMovies : favMovies.split(',').map(function (favMovie) {
              return ' ' + favMovie.trim();
            }),
            favTvShows: Array.isArray(favTvShows) ? favTvShows : favTvShows.split(',').map(function (favTvShow) {
              return ' ' + favTvShow.trim();
            }),
            favActress: favActress,
            favActor: favActor,
            youtube: youtube
          };
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(Profile.findOneAndUpdate({
            user: req.user.id
          }, {
            $set: profileFields
          }, {
            "new": true,
            upsert: true
          }));

        case 8:
          profile = _context2.sent;
          res.json(profile);
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](5);
          console.error(_context2.t0.message);
          res.status(500).send('Server Error');

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 12]]);
}); // @route    PUT api/profile/lastestMoviesSeen
// @desc     Add profile lastestMoviesSeen
// @access   Private

router.put('/latestMoviesSeen', [auth, [check('title', 'Title is required').not().isEmpty()]], function _callee3(req, res) {
  var errors, _req$body2, title, director, plot, newMovieSeen, profile;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body2 = req.body, title = _req$body2.title, director = _req$body2.director, plot = _req$body2.plot;
          newMovieSeen = {
            title: title,
            director: director,
            plot: plot
          };
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }));

        case 8:
          profile = _context3.sent;
          profile.latestMoviesSeen.unshift(newMovieSeen);
          _context3.next = 12;
          return regeneratorRuntime.awrap(profile.save());

        case 12:
          res.json(profile);
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](5);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 15]]);
}); // @route    GET api/profile
// @desc     Get all profiles
// @access   Public

router.get('/', function _callee4(req, res) {
  var profiles;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Profile.find().populate('user', ['name', 'avatar']));

        case 3:
          profiles = _context4.sent;
          res.json(profiles);
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public

router.get('/user/:user_id', checkObjectId('user_id'), function _callee5(_ref, res) {
  var user_id, profile;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user_id = _ref.params.user_id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: user_id
          }).populate('user', ['name', 'avatar']));

        case 4:
          profile = _context5.sent;

          if (profile) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            msg: 'Profile not found'
          }));

        case 7:
          return _context5.abrupt("return", res.json(profile));

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0.message);
          return _context5.abrupt("return", res.status(500).json({
            msg: 'Server error'
          }));

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private

router["delete"]('/', auth, function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Post.deleteMany({
            user: req.user.id
          }));

        case 3:
          _context6.next = 5;
          return regeneratorRuntime.awrap(Profile.findOneAndRemove({
            user: req.user.id
          }));

        case 5:
          _context6.next = 7;
          return regeneratorRuntime.awrap(User.findOneAndRemove({
            _id: req.user.id
          }));

        case 7:
          res.json({
            msg: 'User deleted'
          });
          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);
          res.status(500).send('Server Error');

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;