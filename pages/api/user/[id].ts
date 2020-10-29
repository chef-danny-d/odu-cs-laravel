import dbCon from '../config/db'
import User from '../db/User'
import bcrypt from 'bcrypt'

dbCon()

export default async (req, res) => {
	const {
		method,
		query: { id },
	} = req

	if (method === 'GET') {
		const account = await User.findById(id)

		//check if account can be found in db
		if (!account) {
			return res.status(400).json({
				success: false,
				error: 'This user is not in our records.',
			})
		}
		//proceed if found
		else {
			return res.status(200).json({
				success: true,
				data: account,
			})
		}
	}
	//account modification handling
	else if (method === 'PUT') {
		const user = await User.findById(id)
		if (!user) {
		} else {
			//destructuring body for shorthand
			const {
				firstName,
				lastName,
				email,
				password,
				passwordConf,
			} = req.body
			//create a copy object
			const updatedUser = req.body
			//check body password for match
			if (password === passwordConf) {
				//hash provided passwords
				bcrypt.hash(password, 10).then((hash) => {
					//update copy object passwords with hash
					updatedUser.password = hash
					updatedUser.passwordConf = hash
					//find user and update using copy object
					//we should not have to look for user using id but update is deprecated
					User.findByIdAndUpdate(id, updatedUser, {
						new: true,
						runValidators: true,
					})
						.then((result) => {
							//return updated document if successful
							return res.status(200).json({
								success: true,
								data: result,
							})
						})
						.catch((error) => {
							//catch error if cannot update
							return res.status(400).json({
								success: false,
								error,
							})
						})
				})
			} else {
				return res.status(400).json({
					success: false,
					error: 'Passwords do not match.',
				})
			}
		}
	} else if (method === 'DELETE') {
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
