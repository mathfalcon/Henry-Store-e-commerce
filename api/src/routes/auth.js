const server = require("express").Router();
const passport = require("passport");


server.post('/login', (req, res, next) => {
  
  passport.authenticate("local-login", (err,user,info) => {
    if(err){
      return res.status(200).send({
        success: false,
        message: err.message,
        info,
      });
    }
    if(!user){
      return res.status(200).send({
        success: false,
        info,
      });
    }
    req.login(user, function(err) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({
        success: true,
        message: 'Has ingresado satisfactoriamente',
        info,
        user,
      })
    })
  })(req,res,next)
})


//para testear
server.get('/login', (req, res, next) => {
  
  console.log(req.session)
  console.log(req.isAuthenticated())
  res.send(req.user)
})


module.exports = server;
