import jwt from 'jsonwebtoken'
import axios from 'axios'

export async function getID() {
	const response = await axios.get('/api/verify')
	if (response.data.error) {
		return null
	} else {
		const { sub } = await jwt.decode(response.data.token)
		return sub
	}
}
