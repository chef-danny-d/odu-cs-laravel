import mongoose from 'mongoose'

let User = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		default: null,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		default: null,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		default: null,
		unique: true,
	},
	phone: {
		type: String,
		trim: true,
		default: null,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		default: null,
		minLength: 8,
	},
	passwordConf: {
		type: String,
		required: true,
		trim: true,
		default: null,
		minLength: 8,
	},
	active: {
		type: Boolean,
		default: false,
	},
	searchHistory: [
		{
			default: null,
			trim: true,
			type: Object,
		},
	],
	createdDocuments: [{ type: mongoose.Types.ObjectId }],
})

export default mongoose.models.Users || mongoose.model('Users', User)
