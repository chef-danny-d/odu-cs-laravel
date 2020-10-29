import dbCon from './config/db'
import User from './db/User'

dbCon()

export default async (req, res) => {
	const { method } = req
	if (method === 'GET') {
		const { token } = req.query
		User.findById(token)
			.then((user) => {
				res.status(200).json({ data: user })
			})
			.catch((err) => {
				console.error(err)
			})
	}
}
