import dbCon from '../config/db'
import Docs from '../db/Docs'

dbCon()

export default async (req, res) => {
	const {
		method,
		query: { id },
	} = req

	if (method === 'GET') {
		const document = await Docs.findById(id)

		//check if account can be found in db
		if (!document) {
			return res.status(400).json({
				success: false,
				error: 'This user is not in our records.',
			})
		}
		//proceed if found
		else {
			return res.status(200).json({
				success: true,
				data: document,
			})
		}
	}
}
