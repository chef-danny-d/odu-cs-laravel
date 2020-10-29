import dbCon from './config/db'
import User from './db/User'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'

dbCon()

export default async (req, res) => {
	//handle login request
	if (req.method == 'POST') {
		const { email } = req.body
		const bodyPassword = req.body.password
		const login = await User.findOne({ email })
		if (!login) {
			//if there is no user with given credentials throw error
			return res.status(404).json({
				error: 'User not found. Please register first.',
			})
		} else {
			//handle successful user lookup
			if (login.active) {
				//compare password from form submit to db password, do callback with error and confirmation params
				bcrypt
					.compare(bodyPassword, login.password)
					.then((account) => {
						if (!account) {
							return res.status(401).json({
								success: false,
								error:
									'Password provided does not match our records.',
							})
						} else {
							const claim = { sub: login._id, email: login.email }
							const jwt = sign(claim, process.env.jwt_secret, {
								expiresIn: '1h',
							})

							res.setHeader(
								'Set-Cookie',
								cookie.serialize('session', jwt, {
									httpOnly: true,
									secure:
										process.env.NODE_ENV !== 'development',
									sameSite: 'strict',
									maxAge: 3600,
									path: '/',
								})
							)

							res.status(200).json({
								success: true,
								authenticated: account,
								authToken: jwt,
							})
						}
					})
					.catch((error) => {
						return res.status(500).json({
							error,
						})
					})
			} else {
				return res.status(401).json({
					error: 'Account not yet activated.',
				})
			}
		}
	}
}
