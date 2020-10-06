import dbCon from './config/db'
import User from './db/User'
import bcrypt from 'bcrypt'

dbCon()

export default async (req, res) => {
	//handle login request
	if (req.method == 'POST') {
		const { email } = req.body
		const bodyPassword = req.body.password
		const login = await User.findOne({ email })
		if (!login) {
			//if there is no user with given credentials throw error
			return res.status(400).json({
				error: 'User not found. Please register first.',
			})
		} else {
			//handle successful user lookup
			//compare password from form submit to db password, do callback with error and confirmation params
			bcrypt
				.compare(bodyPassword, login.password)
				.then((account) => {
					if (!account) {
						return res.status(400).json({
							success: false,
							error:
								'Password provided does not match our records.',
						})
					} else {
						return res.status(200).json({
							success: true,
							authenticated: account,
						})
					}
				})
				.catch((error) => {
					return res.status(400).json({
						error,
					})
				})
		}
	}
	//handled render
	else if (req.method == 'GET') {
	}
}
