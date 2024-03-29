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
	if (method === 'POST') {
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
	if (method === 'PUT') {
		const user = await User.findById(id)
		if (!user) {
			res.status(401).json({
				error: 'User not found',
			})
		} else {
			//prevent duplicate addition
			if (user.savedArticles.includes(req.body._id)) {
				res.status(400).json({
					error: 'Article is already saved',
				})
			}
			user.updateOne(
				{
					$push: {
						savedArticles: req.body._id,
					},
				},
				async (err, result) => {
					if (err) {
						res.status(500).json({
							error: err,
						})
					} else {
						const updated = await User.findById(id)
						res.status(200).json({
							data: updated,
						})
					}
				}
			)
		}
	}
	if (method === 'DELETE') {
		const user = await User.findById({ _id: id })
		const doc = req.body.doc

		//check if account can be found in db
		if (!user) {
			return res.status(400).json({
				success: false,
				error: 'This user is not in our records.',
			})
		} else {
			user.updateOne(
				{
					$pull: {
						savedArticles: doc,
					},
				},
				(err, result) => {
					if (err) {
						res.status(400).json({ error: err })
					} else {
						return res.status(200).json({
							success: true,
							data: {},
						})
					}
				}
			)
		}
	}
}
