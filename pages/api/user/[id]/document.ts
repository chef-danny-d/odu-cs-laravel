//add document ID to user's account with PUT/POST command
//remove document ID from user's account with DELETE command

import dbCon from '../../config/db'
import User from '../../db/User'
import Docs from '../../db/Docs'

dbCon()

export default async (req, res) => {
	const {
		method,
		query: { id },
	} = req
	//account modification handling
	if (method === 'PUT') {
		const user = await User.findById(id)
		if (!user) {
			res.status(401).json({
				error: 'User not found',
			})
		} else {
			const { title, description, release, type } = req.body
			const newDocument = new Docs({
				title,
				author: `${user.firstName} ${user.lastName}`,
				description,
				release,
				type,
			})
			newDocument.save().then(async (document) => {
				console.log(document)
				//TODO: check out why ID is not getting added to user's account
				await user.updateOne({
					$push: {
						createdDocuments: document._id,
					},
				})
				const updated = await User.findById(id)
				return res.status(200).json({
					success: true,
					data: updated,
					document,
				})
			})
		}
	}
	if (method === 'DELETE') {
		const deleted = await User.deleteOne({ _id: id })

		//check if account can be found in db
		if (!deleted) {
			return res.status(400).json({
				success: false,
				error: 'This user is not in our records.',
			})
		} else {
			return res.status(200).json({
				success: true,
				data: {},
			})
		}
	}
}
