"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAccount = exports.addLatestMovies = exports.createProfile = exports.getProfileById = exports.getProfiles = exports.getCurrentProfile = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _alert = require("./alert");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Get current users profile
var getCurrentProfile = function getCurrentProfile() {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/profile/me'));

          case 3:
            res = _context.sent;
            dispatch({
              type: _types.GET_PROFILE,
              payload: res.data
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _types.PROFILE_ERROR,
              payload: {
                msg: _context.t0.response.statusText,
                status: _context.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}; // Get all profiles


exports.getCurrentProfile = getCurrentProfile;

var getProfiles = function getProfiles() {
  return function _callee2(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch({
              type: _types.CLEAR_PROFILE
            });
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/profile'));

          case 4:
            res = _context2.sent;
            dispatch({
              type: _types.GET_PROFILES,
              payload: res.data
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            dispatch({
              type: _types.PROFILE_ERROR,
              payload: {
                msg: _context2.t0.response.statusText,
                status: _context2.t0.response.status
              }
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
}; // Get profile by ID


exports.getProfiles = getProfiles;

var getProfileById = function getProfileById(userId) {
  return function _callee3(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/profile/user/".concat(userId)));

          case 3:
            res = _context3.sent;
            dispatch({
              type: _types.GET_PROFILE,
              payload: res.data
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _types.PROFILE_ERROR,
              payload: {
                msg: _context3.t0.response.statusText,
                status: _context3.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}; // Create or update profile


exports.getProfileById = getProfileById;

var createProfile = function createProfile(formData, history) {
  var edit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function _callee4(dispatch) {
    var config, res, errors;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context4.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/profile', formData, config));

          case 4:
            res = _context4.sent;
            dispatch({
              type: _types.GET_PROFILE,
              payload: res.data
            });
            dispatch((0, _alert.setAlert)(edit ? 'Profile Updated' : 'Profile Created', 'success'));

            if (!edit) {
              history.push('/dashboard');
            }

            _context4.next = 15;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            errors = _context4.t0.response.data.errors;

            if (errors) {
              errors.forEach(function (error) {
                return dispatch((0, _alert.setAlert)(error.msg, 'danger'));
              });
            }

            dispatch({
              type: _types.PROFILE_ERROR,
              payload: {
                msg: _context4.t0.response.statusText,
                status: _context4.t0.response.status
              }
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
}; // ADD LATEST MOVIES SEEN


exports.createProfile = createProfile;

var addLatestMovies = function addLatestMovies(formData, history) {
  return function _callee5(dispatch) {
    var config, res, errors;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context5.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].put('/api/profile/latestMoviesSeen', formData, config));

          case 4:
            res = _context5.sent;
            dispatch({
              type: _types.UPDATE_PROFILE,
              payload: res.data
            }); // Set Alert once profile is updated or created

            dispatch((0, _alert.setAlert)('Added!', 'success')); // Redirect 

            history.push('/dashboard');
            _context5.next = 15;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            errors = _context5.t0.response.data.errors;

            if (errors) {
              errors.forEach(function (error) {
                return dispatch((0, _alert.setAlert)(error.msg, 'danger'));
              });
            }

            dispatch({
              type: _types.PROFILE_ERROR,
              payload: {
                msg: _context5.t0.response.statusText,
                status: _context5.t0.response.status
              }
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
}; // Delete account & profile


exports.addLatestMovies = addLatestMovies;

var deleteAccount = function deleteAccount() {
  return function _callee6(dispatch) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!window.confirm('Are you sure? This can NOT be undone!')) {
              _context6.next = 12;
              break;
            }

            _context6.prev = 1;
            _context6.next = 4;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]('/api/profile'));

          case 4:
            dispatch({
              type: _types.CLEAR_PROFILE
            });
            dispatch({
              type: _types.ACCOUNT_DELETED
            });
            dispatch((0, _alert.setAlert)('Your account has been permanantly deleted'));
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            dispatch({
              type: _types.PROFILE_ERROR,
              payload: {
                msg: _context6.t0.response.statusText,
                status: _context6.t0.response.status
              }
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
};

exports.deleteAccount = deleteAccount;