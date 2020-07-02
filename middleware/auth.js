const jwt = require('jsonwebtoken');
const config = require('config');

// middlware function that has access to req & res cycle/objects
// next is a callback runs to next piece of middleware
module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');
  // check if no token
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }) // not authorized
  }
  // verify token
  // if token and valid...
    try {
      // decode thru jwt; put in decoded object
      jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        // set req.user to user in decoded token
        req.user = decoded.user;
        next();
      }
    });
    // if token and not valid...
    } catch(err) {
    console.error('something wrong with auth middleware');
    res.status(401).json({ msg: 'Token is not valid' })
  }
};