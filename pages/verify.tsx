import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, withRouter } from 'next/router'

function Verify(props) {
	const { token } = props.router.query

	const [user, setUser] = useState([])
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	useEffect(() => {
		let data = JSON.stringify({
			token,
		})
		axios
			.post(`http://localhost:3000/api/verify`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				setUser(response.data)
				setLoading(false)
				router.push('/login')
			})
			.catch((error) => {
				console.error(error)
				setLoading(false)
			})
	}, [user, loading])

	return loading ? (
		<p>Loading...</p>
	) : (
		<>{user.data.firstName}'s account is verified</>
	)
}

export default withRouter(Verify)
