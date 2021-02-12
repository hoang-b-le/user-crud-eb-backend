import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../config/env.js';

// put the token in the cookie for easy browser work
// normal token style also works for cross domain etc.
export const signin = (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user) {
			return res.status(401).json({
				error: 'User not found'
			});
		}
		if (!user.authenticate(req.body.password)) {
			return res.status(401).json({
				error: 'Wrong Email or Password!'
			});
		}

		// create new token
		const token = jwt.sign(
			{
				_id: user._id
			},
			config.jwtSecret
		);

		// put the token in cookie
		res.cookie('t', token, {
			expire: new Date() + 3600 // in seconds
		});

		return res.json({
			token,
			user: { _id: user._id, name: user.name, email: user.email }
		});
	});
};

export const signout = (req, res) => {
	res.clearCookie('t');
	return res.status(200).json({
		message: 'Sign out successful!'
	});
};

// this will work with a browser session as well as normal JWT token bearer
export const requireSignin = expressJwt({
	secret: config.jwtSecret,
	getToken: (function fromCookie (req) {
		var token = req.cookies['t'] || req.headers['x-access-token'] ;
		console.log(token);
		if (token) {
			return token;
		}
		return null;
	}),
	userProperty: 'auth',
	algorithms: ['HS256']
});

export const hasAuthorization = (req, res) => {
	const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!authorized) {
		return res.status(403).json({
			error: 'User is not authorized!'
		});
	}
};
