export default (req, res) => {
	res.setHeader(
		'Set-Cookie',
		'session=; Max-Age=0; SameSite=Strict; HttpOnly; Path=/'
	)
	res.status(200).end()
}
