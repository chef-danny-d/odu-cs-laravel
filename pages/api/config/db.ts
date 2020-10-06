import mongoose from 'mongoose'

const connection = {}

async function dbCon() {
	if (connection.isConnected) {
		return
	}

	const db = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	connection.isConnected = db.connections[0].readyState
	console.log(connection.isConnected == 1 ? 'Connected' : 'Error connecting')
}

export default dbCon
