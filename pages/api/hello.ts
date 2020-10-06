import dbCon from './config/db'

dbCon()

export default async (req, res) => {
	res.statusCode = 200
	res.json({ name: 'John Doe' })
}
