import mongoose from 'mongoose'

const connection = { isConnected: null }

async function dbCon() {
	const db = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	connection.isConnected = db.connections[0].readyState
	if (connection.isConnected) {
		return
	}
	console.log(connection.isConnected == 1 ? 'Connected' : 'Error connecting')
}

export default dbCon
