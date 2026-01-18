const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { JWT_SECRET } = require('../config/env.json');
const { userService } = require('../services');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: JWT_SECRET,
  passReqToCallback: true,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (req, payload, done) => {
  try {
    console.log('JWT payload:', payload);
    // Fetch user with key for authentication
    const user = await userService.getUserByIdForAuth(payload.id);

    if (!user) {
      console.log('User not found');
      return done(null, false);
    }

    console.log('user.key:', user.key, 'payload.key:', payload.key);

    if (user.key !== payload.key) {
      console.log('Key mismatch');
      return done(null, false);
    }

    // Remove sensitive data before passing to req.user
    const safeUser = user.get({ plain: true });
    delete safeUser.password;
    delete safeUser.key;
    delete safeUser.keyExpiry;

    return done(null, safeUser);
  } catch (error) {
    console.error('JWT auth error:', error);
    error.status = 401;
    return done(error);
  }
});

passport.use('jwt', jwtLogin);

const requireUserAuth = passport.authenticate('jwt', { session: false, failWithError: true });

module.exports = { requireUserAuth };
