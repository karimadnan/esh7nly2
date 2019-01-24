var
  jwt = require('jsonwebtoken'),
  tokenSecret = process.env.JwtSecret ;

  module.exports.issue = function(payload, exTime) {
    return jwt.sign(
      payload,
      tokenSecret, 
      {
        expiresIn: exTime || '1d' 
      }
    );
  };
  
  module.exports.issueShortLivingToken = function(payload) {
      return jwt.sign(
          payload,
          tokenSecret, 
          {
              expiresIn : '2h'
          }
      );
  };
  module.exports.verify = function(token, callback) {
    return jwt.verify(
      token, 
      tokenSecret,
      {}, 
      callback 
    );
  };