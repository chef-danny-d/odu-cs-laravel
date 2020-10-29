import dbCon from './config/db'
import User from './db/User'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

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
						active: false,
					})
					let transporter = nodemailer.createTransport({
						host: 'smtp.ethereal.email',
						port: 587,
						secure: false, // true for 465, false for other ports
						auth: {
							user: 'abdullah.murphy@ethereal.email', // generated ethereal user
							pass: '9qB5rHCapNReY7awGz', // generated ethereal password
						},
					})

					newUser.save().then(async (user) => {
						const url = `http:localhost:3000/verify?token=${user._id}`
						let mail = await transporter.sendMail({
							from: '"Daniel Papp 👻" <admin@dannydchef.codes>', // sender address
							to: user.email, // list of receivers
							subject: `Verify Triple P Search account, ${user.firstName}`, // Subject line
							//text: "Hello world?", // plain text body
							html: `<p>Hello ${user.firstName}, <br/> 
							Please <a href="${url}">verify your account by clicking this link</a> or copy and paste the following link into your browser address bar <br/>
							<a href="${url}">${url}</a></p>`,
						})
						console.log('Message sent: %s', mail.messageId)
						console.log(
							'Preview URL: %s',
							nodemailer.getTestMessageUrl(mail)
						)
						res.status(200).json({
							success: true,
							data: user,
						})
					})
				})
			}
			//return error for not matching
			else {
				return res.status(400).json({
					error: 'Passwords do not match, please try again.',
				})
			}
		}
	}
}
