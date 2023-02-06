import Cookies from 'cookies'
import dbCon from './config/db'
import User from './db/User'

dbCon()

export default async (req, res) => {
	const cookies = new Cookies(req, res)
	if (req.method === 'POST') {
		const { token } = req.body
		User.findById(token).then((account) => {
			//check if account can be found in db
			if (!account) {
				return res.status(400).json({
					success: false,
					error: 'This user is not in our records.',
				})
			}
			//proceed if found
			else {
				User.updateOne({ _id: token }, { active: true }).then(
					(updatedUser) => {
						return res.status(200).json({
							success: true,
							data: account,
						})
					}
				)
			}
		})
	}
	if (req.method == 'GET') {
		const cook = cookies.get('session')
		if (cook) {
			res.json({
				token: cook,
			})
		} else {
			res.json({
				error: true,
			})
		}
	}
}
