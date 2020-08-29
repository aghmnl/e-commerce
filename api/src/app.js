const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const { User } = require('./db.js');
require("./db.js");

const server = express();

server.name = "API";

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function(email, password, done) {
    try {
      const user = await User.findOne({ where: { email: email } })
      console.log({ user})
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
			// }
			
			const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if(passwordKey === user.password){
        return done(null, user);
			}
			
      // return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id).then((user)=>{
    done(null, user);
  }).catch(err => done(err))
});

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
  methods: "GET, POST, OPTIONS, PUT, DELETE",
}));
server.use("/", routes);
// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.log(err);
	res.status(status).send(message);
});

module.exports = server;
