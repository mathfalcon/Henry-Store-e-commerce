const server = require("express").Router();
const passport = require("passport");

server.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.status(200).send({
        success: false,
        message: err.message,
        info,
      });
    }
    if (!user) {
      return res.status(200).send({
        success: false,
        info,
      });
    }
    req.login(user, function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({
        success: true,
        message: "Has ingresado satisfactoriamente",
        info,
        user,
      });
    });
  })(req, res, next);
});

server.get("/info", (req, res, next) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.send({
      success: true,
      user: req.user,
    });
  } else {
    res.send({
      success: false,
      user: {
        role: "guest",
      },
      message: "No estas logueado",
    });
  }
});

// Hacer un get a esta ruta, desloguea al usuario
server.get("/logout", (req, res, next) => {
  console.log(req.session.destroy());
  req.logOut();

  // .then((deleted) => {
  //   req.logOut();
  //   res.status(200).send({
  //     message: 'Has salido de tu cuenta satisfactoriamente',
  //     success: true
  //   })
  // })
  // .catch(err => res.status(422).send(err))
});

server.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

server.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }), //cambiar luego
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

module.exports = server;
