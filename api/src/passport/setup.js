const { Users } = require("../db.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => {
      if (err) {
        return done(err);
      }
    });
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Users.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "El correo electrónico no existe",
            });
          }
          if (!user.checkPassword(password)) {
            return done(null, false, {
              message: "La contraseña es incorrecta",
            });
          }
          return done(null, user);
        })
        .catch((err) => {
          if (err) {
            return done(err);
          }
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "958019176203-negf5quivisfv6npk0almm4hcsunn6fb.apps.googleusercontent.com",
      clientSecret: "e6qOgfX7fTuXiUyU3wJu53w7",
      callbackURL: "http://localhost:3100/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      Users.findOrCreate({ 
        where: {email: profile._json.email},
        defaults: {
          name: profile.displayName,
          username: 'Google User',
          email: profile._json.email,
          role: 'client'
        }
      }).then(user => {
        return done(null, user[0].dataValues)
      }).catch(err => done(err))
    }
  )
);

module.exports = passport;
