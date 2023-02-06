import mongoose from 'mongoose'

const Docs = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		default: null,
	},
	author: {
		type: String,
		required: true,
		trim: true,
		default: null,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		default: null,
	},
	release: {
		type: Date,
		trim: true,
		default: null,
	},
	type: {
		type: String,
		required: true,
		trim: true,
		default: null,
	},
})

export default mongoose.models.Docs || mongoose.model('Docs', Docs)
