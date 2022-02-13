const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password',
  },
  function(login, password, done) {
    User.findOne({ login: login }, async function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { errmessage: 'Incorrect username or password.' });
      }
      const isPasswordSame = await user.verifyPassword(password);
      if (!isPasswordSame) {
        return done(null, false, { errmessage: 'Incorrect username or password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;