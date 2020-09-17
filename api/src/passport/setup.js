const { Users } = require("../db.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

module.exports = passport;
