import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import axios from 'axios'

const Item = (props) => {
	const [loading, setLoading] = useState(true)
	const [document, setDocument] = useState({ data: [] })

	const id = props.router.query.id

	useEffect(() => {
		axios
			.get(`/api/document/${id}`)
			.then((result) => {
				setDocument(result.data)
				setLoading(false)
				console.log(result.data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	return loading ? (
		<p>loading...</p>
	) : (
		<>
			<h1>{document.data.title}</h1>
			<p>{document.data.handle}</p>
			<p>{document.data.description_abstract}</p>
		</>
	)
}

export default withRouter(Item)
