const server = require("express").Router();
const passport = require('passport');
const crypto = require('crypto');
const { User } = require("../db.js");

//checks if password has > 8 chars
function isValidPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}

//uses a regex to check if email is valid
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//handles register POST
server.post('/register', async function(req, res, next) {
	console.log({ body: req.body})
  const salt = crypto.randomBytes(64).toString('hex');
  const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64');

  if (!isValidPassword(req.body.password)) {
    return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
  }
  if (!isValidEmail(req.body.email)) {
    return res.json({status: 'error', message: 'Email address not formed correctly.'});
  }

  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: password,
      salt: salt
		});
		if (user) {
			passport.authenticate('local', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) {
					return res.json({status: 'error', message: info.message});
				}
				// req.logIn(user, function(err) {
					// if (err) { return next(err); }
					return res.json({status: 'ok'});
				// });
			})(req, res, next);
		}
  } catch (err) {
		console.log({ err })
    return res.json({status: 'error', message: 'Email address already exists.'});
  }
});

server.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json({status: 'error', message: info.message});
    }
    // req.logIn(user, function(err) {
      // if (err) { return next(err); }
      return res.json({status: 'ok'});
    // });
  })(req, res, next);
});

module.exports = server;
