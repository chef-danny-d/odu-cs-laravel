import dbCon from './config/db'
import User from './db/User'
import bcrypt from 'bcrypt'

dbCon()

export default async (req, res) => {
	if (req.method == 'POST') {
		const { firstName, lastName, email, password, passwordConf } = req.body

		const user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({
				error: 'User with provided credentials already exists...',
			})
		} else {
			//check for matching passwords
			if (password === passwordConf) {
				bcrypt.hash(password, 10).then((hash) => {
					const newUser = new User({
						firstName,
						lastName,
						email,
						password: hash,
						passwordConf: hash,
					})
					newUser.save().then((user) => {
						res.statusCode = 200
						return res.status(200).json({
							success: true,
							data: user,
						})
					})
				})
			}
			//return erorr for not matching
			else {
				return res.status(400).json({
					error: 'Passwords do not match, please try again.',
				})
			}
		}
	} else if (req.method == 'GET') {
		//render register component
	}
}
