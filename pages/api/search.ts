import dbCon from './config/db'
import Docs from './db/Docs'

dbCon()

export default async (req, res) => {
	const { method } = req
	if (method === 'GET') {
		//destructuring search query
		const { query } = req.query
		const { type } = req.query
		const { author } = req.query

		let filter: object

		//only type is specified
		if (!author && type) {
			filter = {
				$and: [
					{
						title: { $regex: new RegExp(query, 'i') },
					},
					{
						type,
					},
				],
			}
		}
		//only if author is specified
		if (author && !type) {
			filter = {
				$and: [
					{
						title: { $regex: new RegExp(query, 'i') },
					},
					{
						author: { $regex: new RegExp(author, 'i') },
					},
				],
			}
		}
		//only if both are specified
		if (author && type) {
			filter = {
				$and: [
					{
						title: { $regex: new RegExp(query, 'i') },
					},
					{
						author: { $regex: new RegExp(author, 'i') },
					},
					{
						type,
					},
				],
			}
		}
		//only query is specified
		if (!author && !type) {
			filter = {
				title: { $regex: new RegExp(query, 'i') },
			}
		}

		const documents = await Docs.find(filter)

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
	}
}
