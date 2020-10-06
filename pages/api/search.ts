import dbCon from './config/db'
import Docs from './db/Docs'

dbCon()

export default async (req, res) => {
	const { method } = req
	if (method === 'GET') {
		//destructuring search query
		const { query } = req.query
		const documents = await Docs.find({ title: { $regex: query } })

		if (!documents) {
			return res.status(400).json({
				error: 'No records found',
			})
		} else {
			return res.status(200).json({
				success: true,
				data: documents,
			})
		}
	} else if (method === 'POST') {
		return res.status(500)
	}
}
